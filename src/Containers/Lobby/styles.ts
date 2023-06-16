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
  max-height: 200px;
  min-width: 100px;

  display: flex;
  justify-content: stretch;
  align-items: center;
  flex-direction: column;

  overflow-y: auto;

  /* width */

  &::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }

  /* Handle */

  &::-webkit-scrollbar-thumb {
    background: ${palette.portTudorHotel};
    border-radius: 10px;
  }
`;

export const PlayerEntry = styled('div')`
  font-weight: 700;
  font-size: 18px;
`;

export const StartButton = styled(Button)`
  background-color: ${palette.green};
  font-family: Old English Text MT, sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 28px;

  &.ant-btn-primary {
    &:focus {
      background-color: ${palette.green};
      color: ${palette.black};
    }

    &:active {
      background-color: ${palette.green};
    }

    &:hover {
      background-color: ${palette.green};
      color: ${palette.black};
    }

    &:disabled {
      background-color: ${palette.red};
      color: ${palette.black};
      border-color: ${palette.portTudorHotel};

      &:hover {
        background-color: ${palette.red};
        color: ${palette.black};
      }

      &:focus {
        background-color: ${palette.red};
        color: ${palette.black};
      }
    }
  }
`;
