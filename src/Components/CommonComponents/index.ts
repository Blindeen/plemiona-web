import styled from 'styled-components';

import palette from 'palette';

export const CenteredContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

export const Box = styled('div')`
  background-color: ${palette.dadsRayOfSunshine};
  opacity: 70%;
  border: 5px solid ${palette.brown};
  box-shadow: black 0 0 10px 10px;
  border-radius: 10px;
  width: 40vw;
  height: 40vh;
  min-height: 400px;
  min-width: 300px;
`;

export const Tags = styled('div')`
  font-family: Old English Text MT, sans-serif;
  font-weight: 1000;
  font-size: 24px;
  color: ${palette.black};
`;

export const OptionalText = styled('span')`
  font-family: Old English Text MT, sans-serif;
  font-weight: 1000;
  font-size: 24px;
  color: ${palette.battleshipGray};
`;

export const CenteredDiv = styled(CenteredContainer)`
  align-items: center;
`;

export const Background = styled('div')`
  background-image: url('/Arts/Background1.jpg');
  background-size: cover;
  min-width: 100vw;
  min-height: 100vh;
  background-repeat: repeat;
  background-position: center;
`;

export const CenteredBox = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 100vw;
  min-height: 100vh;
`;
