import styled from 'styled-components';

export const MapBackground = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: stretch;
  flex-wrap: wrap;

  background: red;
  z-index: 2;
  position: relative;
  height: 600px;
  width: 800px;
`;

export const MapSquare = styled('div')`
  flex: 11.2%;
  z-index: 3;

  border-color: black;
  border-width: 0.18px;
  border-style: solid;
`;