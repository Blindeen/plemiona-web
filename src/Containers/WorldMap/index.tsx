import { MapBackground, MapSquare } from 'Containers/WorldMap/styles';
import { useState } from 'react';

type mapTile = {
  type: 'player' | 'empty' | 'barbarians'
  army: null // for now
  isTarget: boolean
}

const WorldMap = () => {
  const BEMap = [...Array.from({ length: 16 }, () =>
    [...Array.from({ length: 16 }, () =>
      ({ type: 'empty', army: null, isTarget: false }),
    )],
  )];

  const [{ x: cordX, y: cordY }, setCords] = useState({ x: 7, y: 7 });

  const mapFragment = (map = BEMap.slice(cordY - 4, cordY + 3), idx = 0): any =>
    map[idx] ? [
      ...map[idx].slice(cordX - 4, cordX + 3),
      ...mapFragment(map, idx + 1),
    ] : [];

  console.log(mapFragment());

  const squares = [...Array.from({ length: 49 }, (_, idx) => <MapSquare key={idx}></MapSquare>)];
  return (
    <>
      <MapBackground>
        {squares}
      </MapBackground>
    </>
  );
};

export default WorldMap;
