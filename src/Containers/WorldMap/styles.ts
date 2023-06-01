import styled from 'styled-components';

export const MapBackground = styled('div')`
  background: red;
  z-index: 2;
  position: relative;
  height: 400px;
  width: 400px;
`;

export const Higher = styled('div')`
  position: absolute;
  z-index: 3;
  width: 20px;
  height: 20px;
`;