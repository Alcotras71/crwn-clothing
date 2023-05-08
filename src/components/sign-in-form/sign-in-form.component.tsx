import { ChangeEvent, FormEvent, useState } from 'react';

import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from 'utils/firebase/firebase.utils';
import FormInput from 'components/form-input/form-input.component';
import Button from 'components/button/button.component';

import type { SignInFormFields } from 'types/authentication';
import type { FirebaseErr } from 'types/firebase-error';

import { ButtonsContainer } from 'components/sign-in-form/sign-in-form.styles';
import { FormContainer } from 'components/sign-up-form/sign-up-form.styles';

const defaultFormFields: SignInFormFields = {
  email: '',
  password: '',
};

const SignInFormComponent = () => {
  const [formFields, setFormFields] =
    useState<SignInFormFields>(defaultFormFields);
  const { email, password } = formFields;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields(prevState => ({ ...prevState, [name]: value }));
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);

      resetFormFields();
    } catch (err) {
      const error = err as FirebaseErr;
      switch (error.code) {
        case 'auth/wrong-password':
          alert('incorrect password for email');
          break;
        case 'auth/user-not-found':
          alert('no user associated with this email');
          break;
        default:
          console.log(err);
      }
    }
  };

  return (
    <FormContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
          minLength={6}
        />
        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button type="button" onClick={signInWithGoogle} buttonType="google">
            Google sign in
          </Button>
        </ButtonsContainer>
      </form>
    </FormContainer>
  );
};

export default SignInFormComponent;
