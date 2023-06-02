import { MapBackground, MapSquare } from 'Containers/WorldMap/styles';

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

  const squares = [...Array.from({ length: 64 }, (_, idx) => <MapSquare key={idx}></MapSquare>)];
  console.log(squares);
  return (
    <>
      <MapBackground>
        {squares}
      </MapBackground>
    </>
  );
};

export default WorldMap;
