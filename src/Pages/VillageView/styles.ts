import styled from 'styled-components';

import palette from 'palette';
import { Row, Statistic } from 'antd';

const { Countdown } = Statistic;

export const StyledDiv = styled('div')`
  background-color: ${palette.dadsRayOfSunshine};
  border: 5px solid #5d4a44;
  box-shadow: ${palette.black} 0 0 5px 5px;
  border-radius: 12px;
  padding: 10px 30px;
`;

export const ResourcesRow = styled(Row)`
  padding-top: 25px;
`;

export const StyledCountdown = styled(Countdown)`
  user-select: none;
`;
