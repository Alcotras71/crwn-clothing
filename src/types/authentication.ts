export interface SignUpFormFields {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type SignInFormFields = Omit<
  SignUpFormFields,
  'confirmPassword' | 'displayName'
>;
