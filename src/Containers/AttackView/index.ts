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
    }

    .ant-modal-body {
      background-color: ${palette.dadsRayOfSunshine};
    }
  }
`;

export const UnitSlider = styled(Slider)`
  width: 80%;

  &.ant-slider .ant-slider-track {
    background-color: ${palette.brown};
  }

  &.ant-slider .ant-slider-handle {
    &::after {
      box-shadow: 0 0 0 2px ${palette.brown};
    }
  }
`;

export const UnitWrapper = styled('div')`
  flex: 0 0 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default AttackView;
