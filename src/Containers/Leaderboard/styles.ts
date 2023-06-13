import { Table, Typography } from 'antd';
import styled from 'styled-components';

import { StyledTable } from 'Components/Table/styles';

import palette from 'palette';

const { Title } = Typography;

export const StyledLeaderboard = styled(StyledTable)`
  @keyframes shiny-animation {
    0% {
      background-position: -16vh;
    }
    100% {
      background-position: 16vh;
    }
  }
}

.ant-table-tbody > tr {
  pointer-events: none;

  &:nth-child(1) {
    animation: shiny-animation 1s infinite ease-in-out alternate-reverse;
    background-image: linear-gradient(to right, ${palette.gold}, ${palette.whiteFlight}, ${palette.gold});
  }

  &:nth-child(2) {
    background-color: ${palette.arcticSilver} !important;
  }

  &:nth-child(3) {
    background-color: ${palette.bronzeMedal} !important;
  }
}
` as typeof Table;

export const LayoutContainer = styled('div')`
  padding-top: 10vh;
`;

export const StyledTitle = styled(Title)`
  font-family: Old English Text MT, sans-serif;
  text-align: center;
  user-select: none;
`;
