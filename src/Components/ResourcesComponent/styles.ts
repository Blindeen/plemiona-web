import styled from 'styled-components';

interface ResourceImgProps {
  type: string;
  width: number;
  height: number;
}

export const ResourcesImg = styled('div')<ResourceImgProps>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background-image: url(${(props) => `/Assets/ResourcesIcons/${props.type}.png`});
  background-size: cover;
`;

export const ResourcesTag = styled('div')`
  font-size: 1.1rem;
  font-weight: 1000;
  color: sandybrown;
  font-family: 'Source Code Pro', sans-serif;
  text-shadow: -1.5px 0 black, 0 1.5px black, 1.5px 0 black, 0 -1.5px black;
`;
