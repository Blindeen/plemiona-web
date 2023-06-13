import { Typography } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;

export const LayoutContainer = styled('div')`
  padding-top: 10vh;
`;

export const StyledTitle = styled(Title)`
  font-family: Old English Text MT, sans-serif;
  text-align: center;
  user-select: none;
`;
