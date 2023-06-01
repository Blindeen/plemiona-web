import { Higher, MapBackground } from 'Containers/WorldMap/styles';

type mapTile = {
  type: 'player' | 'empty' | 'barbarians'
  army: null // for now
  isTarget: boolean
}

const WorldMap = () => {
  const map = [...Array.from({ length: 16 }, () =>
    [...Array.from({ length: 16 }, () =>
      ({ type: 'empty', army: null, isTarget: false }),
    )],
  )];
  return (
    <>
      <MapBackground>
      </MapBackground>
      <Higher>123441</Higher>
      <Higher>323441</Higher>
    </>
  );
};

export default WorldMap;
