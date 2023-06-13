import styled from 'styled-components';
import { Table } from 'antd';

import palette from 'palette';

export const StyledTable = styled(Table)`
  border: 2px solid ${palette.brown};
  border-radius: 8px 8px 0 0;
  box-shadow: black 0 0 5px 5px;
  user-select: none;

  .ant-table-thead > tr > th {
    font-family: Old English Text MT, sans-serif;
    font-size: 1.25rem;
    background-color: ${palette.dadsRayOfSunshine};
    border-color: ${palette.brown};
  }

  .ant-table-tbody > tr {
    background-color: ${palette.dadsRayOfSunshine};

    &:hover {
      background-color: ${palette.dadsRayOfSunshine} !important;
    }
  }

  .ant-table-tbody > tr > td {
    border-color: ${palette.brown};

    &:hover {
      background-color: ${palette.dadsRayOfSunshine} !important;
    }
  }

  .ant-table-cell {
    &.ant-table-cell-row-hover {
      background-color: ${palette.dadsRayOfSunshine} !important;
    }

    &::before {
      background-color: ${palette.brown} !important;
    }
  }
` as typeof Table;
