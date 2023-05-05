import { FC, InputHTMLAttributes } from 'react';

import './form-input.styles';
import {
  FormInputLabel,
  Group,
  Input,
} from 'components/form-input/form-input.styles';

type Props = {
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInputComponent: FC<Props> = ({ label, ...inputProps }) => {
  return (
    <Group>
      <Input {...inputProps} />
      {label && (
        <FormInputLabel shrink={!!(inputProps.value as string).length}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInputComponent;
