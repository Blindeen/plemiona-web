import styled from 'styled-components';
import { Modal } from 'antd';

import palette from 'palette';

export const TownHallWindow = styled(Modal)`
  background-color: ${palette.dadsRayOfSunshine};
  min-width: 650px;
  align-items: center;
  justify-content: center;
  box-shadow: none;
  border: none;
`;
