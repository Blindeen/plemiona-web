import styled from "styled-components";

interface BackgroundProps {
    imageUrl: string
}

const Background = styled("div")<BackgroundProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  width: 100vw;
  height: 100vh;
  background-repeat: no-repeat;
  background-position: center;
`

export default Background;
