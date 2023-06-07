import styled from 'styled-components';
import { Modal } from 'antd';
import palette from 'palette';

export const TownHallWindow = styled(Modal)`
  min-width: 650px;
  align-items: center;
  justify-content: center;
  box-shadow: none;
  border: none;

  &.ant-modal {
    .ant-modal-content {
      background-color: ${palette.dadsRayOfSunshine};
    }

    .ant-modal-header {
      background-color: ${palette.dadsRayOfSunshine};
    }

    .ant-modal-body {
      background-color: ${palette.dadsRayOfSunshine};
    }
  }
`;
