import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import firebase from 'firebase/compat';
import { errorGuard } from '../../guards/error-guard';

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

export const createUserDocumentFromAuth = async <T>(
  userAuth: firebase.UserInfo,
  additionalInformation?: T
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

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return createUserWithEmailAndPassword(auth, email, password);
};
