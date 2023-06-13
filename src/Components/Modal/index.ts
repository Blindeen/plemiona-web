import { Modal as AntdModal } from 'antd';
import styled from 'styled-components';

import palette from 'palette';

const Modal = styled(AntdModal)`
  min-width: 650px;
  align-items: center;
  justify-content: center;
  box-shadow: none;
  border: none;
  user-select: none;

  &.ant-modal {
    .ant-modal-content {
      background-color: ${palette.dadsRayOfSunshine};
      box-shadow: black 0 0 5px 5px;
      border: 2px solid ${palette.brown};
    }

    .ant-modal-header {
      background-color: ${palette.dadsRayOfSunshine};
      margin-left: 20px;
    }

    .ant-modal-body {
      background-color: ${palette.dadsRayOfSunshine};
      margin-left: 20px;
    }
  }
`;

export default Modal;
