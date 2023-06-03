import { useState } from 'react';

import { MapFrame, MapImage, MapSquare } from 'Containers/WorldMap/styles';
import { playerType } from 'resourceContext';

export type mapTile = {
  type: 'player' | 'empty' | 'barbarians'
  player?: playerType
  army?: null // for now
  isTarget: boolean
}

export const FRAME_SQUARES = 7;
const MAP_SQUARES_X = 16;
const MAP_SQUARES_Y = 16;

const WorldMap = () => {

  const [{ x: cordX, y: cordY }, setCords] = useState({ x: 3, y: 3 });

  let BEMap = [...Array.from({ length: MAP_SQUARES_Y }, () =>
    [...Array.from({ length: MAP_SQUARES_X }, () =>
      ({ type: 'empty', army: null, isTarget: false }),
    )],
  )] as mapTile[][];

  BEMap[4][4] = { type: 'player', army: null, isTarget: false, player: { nickname: 'Adam', id: 5 } };


  const mapFragment = (map = BEMap.slice(cordY, cordY + FRAME_SQUARES), idx = 0): mapTile[] =>
    map[idx] ? [
      ...map[idx].slice(cordX, cordX + FRAME_SQUARES),
      ...mapFragment(map, idx + 1),
    ] : [];

  const calculateAbsolute = (relativeIdx: number) => [relativeIdx % FRAME_SQUARES + cordX, Math.floor(relativeIdx / FRAME_SQUARES) + cordY];

  const handleCLick = (relativeIdx: number) => {
    const [absoluteX, absoluteY] = calculateAbsolute(relativeIdx);
    console.log(`${absoluteX} ${absoluteY}`);
    //request with cords
  };

  const moveMap = (direction: 'right' | 'left' | 'up' | 'down') => {
    switch (direction) {
      case 'left':
        if (cordX <= 0) return;
        setCords({ x: cordX - 1, y: cordY });
        break;
      case 'right':
        if (cordX >= MAP_SQUARES_X - FRAME_SQUARES) return;
        setCords({ x: cordX + 1, y: cordY });
        break;
      case 'up':
        if (cordY <= 0) return;
        setCords({ x: cordX, y: cordY - 1 });
        break;
      case 'down':
        if (cordY >= MAP_SQUARES_Y - FRAME_SQUARES) return;
        setCords({ x: cordX, y: cordY + 1 });
        break;
    }
  };

  const squares = mapFragment().map(({ type, player, army, isTarget }, idx) =>
    <MapSquare
      onClick={() => type !== 'empty' && handleCLick(idx)}
      key={idx}>
      {type === 'player' && player?.nickname}
    </MapSquare>,
  );

  return (
    <>
      <MapFrame>
        <MapImage
          src='/Arts/HomePage.jpg'
          cordX={cordX}
          cordY={cordY}
        />
        {squares}
      </MapFrame>
    </>
  );
};

export default WorldMap;
