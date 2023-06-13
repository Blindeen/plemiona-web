import styled from 'styled-components';

interface UnitImgProps {
  type: string;
  width: number;
  height: number;
}

export const UnitImg = styled('div')<UnitImgProps>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background-image: url(${(props) => `/assets/units-icons/${props.type}.png`});
  background-size: cover;
`;

export const UnitTag = styled('div')`
  font-size: 1.3rem;
  font-weight: 700;
  color: sandybrown;
  font-family: 'Source Code Pro', sans-serif;
  text-shadow: -1.5px 0 black, 0 1.5px black, 1.5px 0 black, 0 -1.5px black;
`;

export const UnitNameTag = styled('div')`
  font-family: 'Old English Text MT', sans-serif;
  font-size: 15px;
  font-weight: 700;
`;
