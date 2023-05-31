import styled from 'styled-components';
import palette from 'palette';

export const ResourcesView = styled('div')`
  background-color: ${palette.dadsRayOfSunshine};
  border: 5px solid #5d4a44;
  box-shadow: ${palette.black} 0 0 5px 5px;
  min-width: 760px;
  border-radius: 12px;
`;

export const Clay = styled('div')`
  width: 64px;
  height: 64px;
  background-image: url('/Assets/ResourcesIcons/clay.png');
`;
