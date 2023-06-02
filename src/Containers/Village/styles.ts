import styled from 'styled-components';
import palette from 'palette';

export const Container = styled('div')`
  position: relative;
  background-image: url('/Arts/Backgrounds/game_page_village.jpg');
  background-size: cover;
  width: 760px;
  height: 760px;
  min-width: 760px;
  min-height: 760px;
  border: 5px solid #5d4a44;
  box-shadow: ${palette.black} 0 0 5px 5px;
  border-radius: 12px;
`;
