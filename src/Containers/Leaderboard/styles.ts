import { Table, Typography } from 'antd';
import styled from 'styled-components';

import { StyledTable } from 'Components/Table/styles';

import palette from 'palette';

const { Title } = Typography;

export const StyledLeaderboard = styled(StyledTable)`
  max-height: 550px;
  overflow-y: auto;

  /* Hide scrollbar for Chrome, Safari and Opera */

  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  @keyframes shiny-animation {
    0% {
      background-position: -9vw;
    }
    100% {
      background-position: 9vw;
    }
  }

  .ant-table-tbody > tr {
    pointer-events: none;

    &:nth-child(1) {
      animation: shiny-animation 1s infinite ease-in-out alternate-reverse;
      background-image: linear-gradient(to right, ${palette.gold}, ${palette.whiteFlight}, ${palette.gold});
    }

    &:nth-child(2) {
      background-color: ${palette.arcticSilver};
    }

    &:nth-child(3) {
      background-color: ${palette.bronzeMedal};
    }
  }

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
