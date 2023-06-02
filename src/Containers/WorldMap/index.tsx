import { MapBackground, MapSquare } from 'Containers/WorldMap/styles';
import { useState } from 'react';

type mapTile = {
  type: 'player' | 'empty' | 'barbarians'
  army: null // for now
  isTarget: boolean
}

const WorldMap = () => {
  const FRAGMENT_SIZE = 7;

  const BEMap = [...Array.from({ length: 16 }, () =>
    [...Array.from({ length: 16 }, () =>
      ({ type: 'empty', army: null, isTarget: false }),
    )],
  )] as mapTile[][];
  const [{ x: cordX, y: cordY }, setCords] = useState({ x: 3, y: 3 });

  const mapFragment = (map = BEMap.slice(cordY, cordY + FRAGMENT_SIZE), idx = 0): mapTile[] =>
    map[idx] ? [
      ...map[idx].slice(cordX, cordX + FRAGMENT_SIZE),
      ...mapFragment(map, idx + 1),
    ] : [];

  const squares = mapFragment().map((square, idx) => <MapSquare key={idx}></MapSquare>);
  return (
    <>
      <MapBackground>
        {squares}
      </MapBackground>
    </>
  );
};

export default WorldMap;
