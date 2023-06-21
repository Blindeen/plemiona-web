import { InputNumberProps, InputProps } from 'antd';

import { StyledInput, StyledInputNumber } from './styles';

const Input = ({ type = 'text', ...rest }: InputProps) => <StyledInput type={type} {...rest} />;

export const InputNumber = ({ ...rest }: InputNumberProps) => <StyledInputNumber {...rest} />;

export default Input;
