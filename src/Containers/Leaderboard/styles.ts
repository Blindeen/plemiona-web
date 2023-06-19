import { Table, Typography } from 'antd';
import styled from 'styled-components';

import { StyledTable } from 'Components/Table/styles';

const { Title } = Typography;

export const StyledLeaderboard = styled(StyledTable)`
  max-height: 550px;
  overflow-y: auto;
  pointer-events: none;

  /* Hide scrollbar for Chrome, Safari and Opera */

  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
` as typeof Table;

export const CenteredContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

export const StyledTitle = styled(Title)`
  font-family: Old English Text MT, sans-serif;
  text-align: center;
  user-select: none;
  margin-bottom: 0 !important;
  margin-top: 0 !important;
`;
