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

  const [{ x: cordX, y: cordY }, setCords] = useState({ x: 3, y: 3 });

  const mapFragment = (map = BEMap.slice(cordY, cordY + 7), idx = 0): any =>
    map[idx] ? [
      ...map[idx].slice(cordX, cordX + 7),
      ...mapFragment(map, idx + 1),
    ] : [];

  console.log(mapFragment());

  const squares = (mapFragment() as mapTile[]).map((square, idx) => <MapSquare key={idx}></MapSquare>);
  return (
    <>
      <MapBackground>
        {squares}
      </MapBackground>
    </>
  );
};

export default WorldMap;
