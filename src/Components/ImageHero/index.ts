import styled from 'styled-components';

interface ImageHeroProps {
  imageurl: string;
}

const ImageHero = styled('div')<ImageHeroProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${(props) => props.imageurl});
  background-size: cover;
  width: 100vw;
  height: 100vh;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 1;
`;

export default ImageHero;
