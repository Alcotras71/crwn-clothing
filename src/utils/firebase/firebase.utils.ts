import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore';
import { NextOrObserver } from '@firebase/auth';

import { errorGuard } from 'guards/error-guard';

import type { CategoryInterface } from 'types/categories';
import type { UserAdditionalInfo, UserInfo } from 'types/user';

const firebaseConfig = {
  apiKey: 'AIzaSyAfS6K_8dLJVL21fC5URicWbI1BtE19uT0',
  authDomain: 'crwn-clothing-db-bd9a1.firebaseapp.com',
  projectId: 'crwn-clothing-db-bd9a1',
  storageBucket: 'crwn-clothing-db-bd9a1.appspot.com',
  messagingSenderId: '1027713394784',
  appId: '1:1027713394784:web:4d0aff4e2771464c017b05',
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async <T extends object>(
  collectionKey: string,
  objectsToAdd: T[]
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach(object => {
    if ('title' in object && typeof object.title === 'string') {
      const docRef = doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef, object);
    }
  });

  await batch.commit();
  console.log('done');
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(docSnapshot =>
    docSnapshot.data()
  ) as CategoryInterface[];
};

export const createUserDocumentFromAuth = async (
  userAuth: UserInfo,
  additionalInformation?: UserAdditionalInfo
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...(additionalInformation ? additionalInformation : {}),
      });
    } catch (err) {
      console.log('error creating the user', errorGuard(err));
    }
  }

  return userSnapshot;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (
  callback: NextOrObserver<UserInfo | null>
) => onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<UserInfo | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      userAuth => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
