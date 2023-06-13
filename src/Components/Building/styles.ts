import styled from 'styled-components';

import palette from 'palette';

interface BuildingContainerProps {
  y: number;
  x: number;
  width: number;
  height: number;
}

interface BuildingProps {
  type: string;
  tier: number;
}

interface BuildingLvLProps {
  x: number;
  y: number;
}

export const BuildingContainer = styled('div')<BuildingContainerProps>`
  position: absolute;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;

export const StyledBuilding = styled('div')<BuildingProps>`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => `/Assets/Buildings/${props.type}-Tier-${props.tier}-min.png`});
  background-repeat: no-repeat;
  background-size: cover;
  cursor: url('/Assets/Cursors/CursorOnClick.png') 2 2, auto !important;
`;

export const Gate = styled('div')<BuildingContainerProps>`
  position: absolute;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  cursor: url('/Assets/Cursors/CursorOnClick.png') 2 2, auto !important;
`;

export const BuildingLvL = styled('div')<BuildingLvLProps>`
  position: absolute;
  width: fit-content;
  height: fit-content;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
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
  cursor: url('/Assets/Cursors/CursorOnClick.png') 2 2, auto !important;
`;
