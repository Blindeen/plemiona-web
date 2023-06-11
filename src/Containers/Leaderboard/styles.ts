import styled from 'styled-components';
import { Table } from 'antd';

import palette from 'palette';

export const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: ${palette.dadsRayOfSunshine};
  }

  .ant-table-tbody > tr > td {
    background-color: ${palette.dadsRayOfSunshine};
  }
`;
