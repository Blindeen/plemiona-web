import styled from 'styled-components';

import palette from 'palette';

export const StyledBuilding = styled('div')`
  position: absolute;
  width: 200px;
  height: 200px;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: url('/assets/cursors/cursor-on-click.png') 2 2, auto !important;
`;

export const BuildingLvL = styled('div')`
  position: absolute;
  width: fit-content;
  height: fit-content;
  top: 0;
  left: 0;
  opacity: 70%;
  font-weight: 700;
  font-family: Arial, sans-serif;
  font-size: 20px;
  border: 2px solid ${palette.black};
  background-color: ${palette.dadsRayOfSunshine};
  border-radius: 4px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: url('/assets/cursors/cursor-on-click.png') 2 2, auto !important;
`;
