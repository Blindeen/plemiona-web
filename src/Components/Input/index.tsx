import { InputProps } from 'antd';

import { StyledInput } from 'Components/Input/styles';

const Input = ({ type = 'text', ...rest }: InputProps) => {
  return <StyledInput type={type} {...rest} />;
};

export default Input;
