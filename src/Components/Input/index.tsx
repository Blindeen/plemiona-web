import { InputProps } from 'antd';

import { StyledInput } from './styles';

const Input = ({ type = 'text', ...rest }: InputProps) => <StyledInput type={type} {...rest} />;

export default Input;
