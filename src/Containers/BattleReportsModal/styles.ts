import styled from 'styled-components';
import { Col } from 'antd';

export const SectionHeader = styled.h1`
  font-size: 2em;
  margin: 0.5em 0 0;
  font-family: Old English Text MT, sans-serif;
  font-weight: bold;
`;

export const Highlight = styled.span`
  font-weight: bold;
`;

export const SectionText = styled.span`
  font-size: 1.2em;
  white-space: pre-wrap;
  float: left;
  clear: left;
`;

export const Count = styled.span`
  font-size: 2em;
`;

export const Report = styled(Col)`
  border: 1px solid #000;
  padding: 0.5em;
`;
