import styled from 'styled-components';
import { Input } from 'antd';

import palette from 'palette';

export const StyledInput = styled(Input)`
  background-color: ${palette.cream};
  border-color: ${palette.portTudorHotel};
  font-weight: 700;
  font-size: 18px;

  &.ant-input {
    &:hover,
    &:focus {
      box-shadow: none;
      border-color: ${palette.brown};
    }
  }
`;
