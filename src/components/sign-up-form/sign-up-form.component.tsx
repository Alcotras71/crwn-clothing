import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from 'utils/firebase/firebase.utils';
import FormInput from 'components/form-input/form-input.component';
import Button from 'components/button/button.component';
import { errorGuard } from 'guards/error-guard';

import type { SignUpFormFields } from 'types/authentication';
import type { FirebaseErr } from 'types/firebase-error';

import { FormContainer } from 'components/sign-up-form/sign-up-form.styles';
import { signUpStart } from 'store/user/user.action';

const defaultFormFields: SignUpFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const dispatch = useDispatch();

  const [formFields, setFormFields] =
    useState<SignUpFormFields>(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields(prevState => ({ ...prevState, [name]: value }));
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('passwords do not match');
      return;
    }

    try {
      dispatch(signUpStart(email, password, displayName));
      resetFormFields();
    } catch (err) {
      const error = err as FirebaseErr;
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      }
      console.log('user creation encountered an error', errorGuard(err));
    }
  };

  return (
    <FormContainer>
      <h2>{`Don't`} have and account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

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

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
          minLength={6}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </FormContainer>
  );
};

export default SignUpForm;
