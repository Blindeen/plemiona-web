import { ForwardedRef, forwardRef } from 'react';
import { ButtonProps } from 'antd';

import { StyledButton } from './styles';

const Button = forwardRef(
  ({ type = 'primary', shape = 'round', ...rest }: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => (
    <StyledButton type={type} shape={shape} ref={ref} {...rest} />
  )
);

export default Button;
