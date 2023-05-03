import { FC, InputHTMLAttributes } from 'react';

import './form-input.styles.scss';

type Props = {
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInputComponent: FC<Props> = ({ label, ...inputProps }) => {
  return (
    <div className="group">
      <input className="form-input" {...inputProps} />
      {label && (
        <label
          className={`${
            (inputProps.value as string).length ? 'shrink' : ''
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInputComponent;
