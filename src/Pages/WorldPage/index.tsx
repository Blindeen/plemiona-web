import WorldMap from 'Containers/WorldMap';
import ImageHero from 'Components/ImageHero';

const WorldPage = () => {
  return (
    <ImageHero imageurl='/Arts/HomePage.jpg'>
      <WorldMap></WorldMap>
    </ImageHero>
  );
};

export default WorldPage;
