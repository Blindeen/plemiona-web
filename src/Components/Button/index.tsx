import { ButtonProps } from 'antd';

import { StyledButton } from 'Components/Button/styles';

const Button = ({ type = 'primary', shape = 'round', ...rest }: ButtonProps) => {
  return <StyledButton type={type} shape={shape} {...rest} />;
};

export default Button;
