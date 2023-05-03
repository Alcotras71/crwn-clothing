import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';

import './button.styles.scss';

const BUTTON_TYPE_CLASSES = {
  google: 'google-sign-in',
  inverted: 'inverted',
  default: 'default',
};

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
  return (
    <button
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;
