import styled from 'styled-components';

import palette from 'palette';

const FRAME_HEIGHT = 574;
const FRAME_WIDTH = 784;

export const FRAME_SQUARES_X = 7;
export const FRAME_SQUARES_Y = 5;

interface MapImageProps {
  cordX: number;
  cordY: number;
}

export const MapFrame = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: stretch;
  flex-wrap: wrap;

  z-index: 2;
  position: relative;
  overflow: hidden;
  width: ${FRAME_WIDTH}px;
  height: ${FRAME_HEIGHT}px;
`;

export const MapImage = styled('img')<MapImageProps>`
  position: absolute;
  z-index: 2;
  left: ${({ cordX }) => -cordX * FRAME_WIDTH / FRAME_SQUARES_X}px;
  top: ${({ cordY }) => -cordY * FRAME_HEIGHT / FRAME_SQUARES_Y}px
`;

export const MapSquare = styled('div')`
  position: relative;

  flex: 1 1 calc(100% / ${FRAME_SQUARES_X});
  width: calc(100% / ${FRAME_SQUARES_X});
  height: calc(100% / ${FRAME_SQUARES_Y});
  z-index: 3;

  text-align: center;
  font-family: Old English Text MT, sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: ${palette.black};

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    border-color: black;
    border-width: 0.18px;
    border-style: solid;
    box-sizing: border-box;
  }
`;