import styled from 'styled-components';
import { Button } from 'antd';

import palette from 'palette';

export const StyledButton = styled(Button)`
  background-color: ${palette.cream};
  border-color: ${palette.portTudorHotel};
  color: ${palette.black};

  font-family: CircularStd, sans-serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 28px;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: background-color 0.2s, border-color 0.2s;

  &.ant-btn-primary {
    &:hover,
    &:focus,
    &:active {
      background-color: ${palette.cream};
      border-color: ${palette.black};
      box-shadow: none;
    }

    &:focus-visible {
      outline: none;
    }

    &:disabled {
      &:hover {
        background-color: ${palette.cream};
        border-color: ${palette.black};
      }
    }
  }

  &.ant-btn {
    &.ant-btn-lg {
      width: 100%;
      padding: 12px 24px;
    }

    &:hover {
      color: ${palette.black};
    }
  }

  &.ant-btn-link {
    color: ${palette.black};
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    background-color: transparent;
    border-color: transparent;

    display: inline-flex;
    align-items: center;

    &:hover,
    &:focus,
    &:active {
      color: ${palette.black};
    }
  }
`;
