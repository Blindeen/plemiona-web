import styled from 'styled-components';

import palette from 'palette';

export const FRAME_SQUARES_X = 7;
export const FRAME_SQUARES_Y = 5;

export const MAP_SQUARES_X = 22;
export const MAP_SQUARES_Y = 16;

const MAP_IMAGE_WIDTH = 2624;
const MAP_IMAGE_HEIGHT = 1856;

const FRAME_WIDTH = MAP_IMAGE_WIDTH / MAP_SQUARES_X * FRAME_SQUARES_X;
const FRAME_HEIGHT = MAP_IMAGE_HEIGHT / MAP_SQUARES_Y * FRAME_SQUARES_Y;

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
  cordX: number;
  cordY: number;
}

export const MapImage = styled('img')<MapImageProps>`
  position: absolute;
  z-index: 2;
  left: ${({ cordX }) => -cordX * FRAME_WIDTH / FRAME_SQUARES_X}px;
  top: ${({ cordY }) => -cordY * FRAME_HEIGHT / FRAME_SQUARES_Y}px
`;

interface NavArrowProps {
  direction: 'up';
}

const handleDirection = ({ direction }: NavArrowProps) => {
  switch (direction) {
    case 'up':
      return { left: 45, top: 1, rotation: 0 };
  }
};

export const NavArrow = styled('img')<NavArrowProps>`
  position: absolute;
  z-index: 3;
  left: ${(props) => handleDirection(props).left}%;
  top: ${(props) => handleDirection(props).top}%;
  transform: rotate(${(props) => handleDirection(props).rotation}deg);

  background-size: cover;
  width: 10%;
  height: 10%;
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