import React, { FC } from 'react';
import {
  SpinnerContainer,
  SpinnerOverlay,
} from 'components/spinner/spinner.styles';

const Spinner: FC = (): JSX.Element => (
  <SpinnerOverlay>
    <SpinnerContainer />
  </SpinnerOverlay>
);

export default Spinner;
