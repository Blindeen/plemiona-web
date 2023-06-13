import styled from 'styled-components';
import { Modal, Slider } from 'antd';
import palette from 'palette';

export const UnitDistributionWrapper = styled('div')`
  min-width: 480px;
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: flex-start;

  flex-wrap: wrap;
`;

const AttackView = styled(Modal)`
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

export const UnitSlider = styled(Slider)`
  flex: 0 0 77%;
  margin-top: 2%;
`;

export const UnitWrapper = styled('div')`
  flex: 0 0 12%;
`;

export default AttackView;
