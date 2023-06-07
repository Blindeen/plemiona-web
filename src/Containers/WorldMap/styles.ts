import styled from 'styled-components';

import palette from 'palette';

export const FRAME_SQUARES_X = 7;
export const FRAME_SQUARES_Y = 5;

export const MAP_SQUARES_X = 22;
export const MAP_SQUARES_Y = 16;

const MAP_IMAGE_WIDTH = 2624;
const MAP_IMAGE_HEIGHT = 1856;

const FRAME_WIDTH = (MAP_IMAGE_WIDTH / MAP_SQUARES_X) * FRAME_SQUARES_X;
const FRAME_HEIGHT = (MAP_IMAGE_HEIGHT / MAP_SQUARES_Y) * FRAME_SQUARES_Y;

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

interface MapImageProps {
  cordx: number;
  cordy: number;
}

export const MapImage = styled('img')<MapImageProps>`
  position: absolute;
  z-index: 2;
  left: ${({ cordx }) => (-cordx * FRAME_WIDTH) / FRAME_SQUARES_X}px;
  top: ${({ cordy }) => (-cordy * FRAME_HEIGHT) / FRAME_SQUARES_Y}px;
`;

const ARROW_WIDTH = 64;
const ARROW_HEIGHT = 64;
const ARROW_MARGIN = 3;

export type direction = 'up' | 'down' | 'left' | 'right';

interface NavArrowProps {
  direction: direction;
}

export const DIRECTIONS: Record<direction, direction> = { up: 'up', down: 'down', left: 'left', right: 'right' };

const handleDirection = (direction: direction) => {
  switch (direction) {
    case DIRECTIONS.up:
      return { left: (FRAME_WIDTH - ARROW_WIDTH) / 2, top: ARROW_MARGIN, rotation: 0 };
    case DIRECTIONS.down:
      return { left: (FRAME_WIDTH - ARROW_WIDTH) / 2, top: FRAME_HEIGHT - ARROW_HEIGHT - ARROW_MARGIN, rotation: 180 };
    case DIRECTIONS.left:
      return { left: ARROW_MARGIN, top: (FRAME_HEIGHT - ARROW_HEIGHT) / 2, rotation: 270 };
    case DIRECTIONS.right:
      return { left: FRAME_WIDTH - ARROW_WIDTH - ARROW_MARGIN, top: (FRAME_HEIGHT - ARROW_HEIGHT) / 2, rotation: 90 };
  }
  return { left: 0, top: 0, rotation: 0 };
};

export const NavArrow = styled('img')<NavArrowProps>`
  position: absolute;
  z-index: 3;
  left: ${({ direction }) => handleDirection(direction).left}px;
  top: ${({ direction }) => handleDirection(direction).top}px;
  transform: rotate(${({ direction }) => handleDirection(direction).rotation}deg);

  background-size: cover;
  width: ${ARROW_WIDTH}px;
  height: ${ARROW_HEIGHT}px;
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
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    border-color: black;
    border-width: 1px;
    border-color: rgba(0, 0, 255, 0.13);
    border-style: solid;
    box-sizing: border-box;
  }
`;