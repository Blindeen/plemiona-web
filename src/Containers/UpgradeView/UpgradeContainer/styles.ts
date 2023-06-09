import styled from 'styled-components';
import Button from 'Components/Button';
import palette from 'palette';

export const UpgradeButton = styled(Button)`
  font-size: 20px;
  min-width: 100px;
  background-color: ${palette.green};
  border-color: ${palette.black};

  &.ant-btn-primary {
    background-color: ${palette.green};
    border-color: ${palette.black};

    &:hover {
      background-color: ${palette.green};
      border-color: ${palette.black};
    }
    
    &:disabled {
      background-color: ${palette.red};
      border-color: ${palette.black};
      color: ${palette.black};

      &:hover {
        background-color: ${palette.red};
        border-color: ${palette.black};
      }

      &:focus {
        background-color: ${palette.red};
        border-color: ${palette.black};
      }
    }

    &:focus {
      background-color: ${palette.red};
      border-color: ${palette.black};
    }
  }
`;

export const NameTag = styled('div')`
  font-size: 14.5px;
  font-weight: 600;
  font-family: Arial, sans-serif;
  width: fit-content;
`;

export const TimeTag = styled('div')`
  font-size: 14.5px;
  font-weight: 600;
  font-family: Arial, sans-serif;
  width: fit-content;
`;

export const MaxLvlTag = styled('div')`
  display: flex;
  font-size: 20px;
  font-weight: 800;
  font-family: Old English Text MT, sans-serif;
  width: auto;
  justify-content: center;
`;
