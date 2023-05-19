import firebase from 'firebase/compat';

export type UserInfo = firebase.UserInfo;

export type UserCredential = firebase.auth.UserCredential;

export type UserInfoWithId = { id?: string } & UserInfo;

export type UserAdditionalInfo = Partial<{
  email: string;
  password: string;
  displayName: string;
}>;
