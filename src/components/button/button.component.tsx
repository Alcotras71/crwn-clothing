import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';

import {
  BaseButton,
  InvertedButton,
  GoogleSignInButton,
} from './button.styles';

export const BUTTON_TYPE_CLASSES = {
  google: 'google-sign-in',
  inverted: 'inverted',
  default: 'default',
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.default) =>
  ({
    [BUTTON_TYPE_CLASSES.default]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType]);

type Props = PropsWithChildren<
  {
    buttonType?: keyof typeof BUTTON_TYPE_CLASSES;
  } & ButtonHTMLAttributes<HTMLButtonElement>
>;

const ButtonComponent: FC<Props> = ({
  children,
  buttonType = 'default',
  ...buttonProps
}) => {
  const CustomButton = getButton(BUTTON_TYPE_CLASSES[buttonType]);

  return <CustomButton {...buttonProps}>{children}</CustomButton>;
};

export default ButtonComponent;
