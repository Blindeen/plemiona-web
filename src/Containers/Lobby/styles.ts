import styled from 'styled-components';

import palette from 'palette';
import Button from 'Components/Button';

export const PlayerList = styled('div')`
  position: static;
  background-color: ${palette.cream};
  opacity: 70%;
  border: 1px solid ${palette.portTudorHotel};
  border-radius: 10px;
  width: 100%;
  height: 100%;
  min-height: 200px;
  min-width: 100px;
`;

export const PlayerEntry = styled('div')``;

export const StartButton = styled(Button)`
  background-color: green;
  font-family: Old English Text MT, sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 28px;

  &.ant-btn-primary {
    &:focus {
      background-color: green;
      color: ${palette.black};
    }

    &:active {
      background-color: green;
    }

    &:hover {
      background-color: green;
      color: ${palette.black};
    }

    &:disabled {
      background-color: red;
      color: ${palette.black};
      border-color: ${palette.portTudorHotel};

      &:hover {
        background-color: red;
        color: ${palette.black};
      }
    }
  }
`;
