import { InputProps } from 'antd';

import { StyledInput } from 'Components/Input/styles';

const Input = ({ type = 'text', ...rest }: InputProps) => (
  <StyledInput type={type} {...rest} />
);

export default Input;
