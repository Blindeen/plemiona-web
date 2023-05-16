import styled from 'styled-components';
import palette from 'palette';

export const Box = styled('div')`
  padding-top: 100px;
  background-color: ${palette.dadsRayOfSunshine};
  opacity: 70%;
  border: 5px solid ${palette.brown};
  box-shadow: black 0 0 10px 10px;
  border-radius: 10px;
  width: 40vw;
  height: 40vh;
  min-height: 20vh;
  min-width: 20vw;
`;
export const Tags = styled('div')`
  font-family: Old English Text MT, sans-serif;
  font-weight: 1000;
  font-size: 20px;
  color: ${palette.black};
`;

export const OptionalText = styled('span')`
  font-family: Old English Text MT, sans-serif;
  font-weight: 1000;
  font-size: 20px;
  color: ${palette.battleshipGray};
`;
