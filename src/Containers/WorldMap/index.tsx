import { useState } from 'react';

import {
  direction,
  DIRECTIONS,
  FRAME_SQUARES_X,
  FRAME_SQUARES_Y,
  MAP_SQUARES_X,
  MAP_SQUARES_Y,
  MapFrame,
  MapImage,
  MapSquare,
  NavArrow,
} from 'Containers/WorldMap/styles';
import { playerType } from 'resourceContext';

export type mapTile = {
  type: 'player' | 'empty' | 'barbarians'
  player?: playerType
  army?: null // for now
  isTarget: boolean
}

const WorldMap = () => {

  const [{ x: cordX, y: cordY }, setCords] = useState({ x: 3, y: 3 });

  let BEMap = [...Array.from({ length: MAP_SQUARES_Y }, () =>
    [...Array.from({ length: MAP_SQUARES_X }, () =>
      ({ type: 'empty', army: null, isTarget: false }),
    )],
  )] as mapTile[][];

  BEMap[4][4] = { type: 'player', army: null, isTarget: false, player: { nickname: 'Adam', id: 5 } };


  const mapFragment = (map = BEMap.slice(cordY, cordY + FRAME_SQUARES_Y), idx = 0): mapTile[] =>
    map[idx] ? [
      ...map[idx].slice(cordX, cordX + FRAME_SQUARES_X),
      ...mapFragment(map, idx + 1),
    ] : [];

  const calculateAbsolute = (relativeIdx: number) => [relativeIdx % FRAME_SQUARES_X + cordX, Math.floor(relativeIdx / FRAME_SQUARES_X) + cordY];

  const handleCLick = (relativeIdx: number) => {
    const [absoluteX, absoluteY] = calculateAbsolute(relativeIdx);
    console.log(`${absoluteX} ${absoluteY}`);
    //request with cords
  };

  const moveMap = (direction: direction) => {
    switch (direction) {
      case DIRECTIONS.left:
        if (cordX <= 0) return;
        setCords({ x: cordX - 1, y: cordY });
        break;
      case DIRECTIONS.right:
        if (cordX >= MAP_SQUARES_X - FRAME_SQUARES_X) return;
        setCords({ x: cordX + 1, y: cordY });
        break;
      case DIRECTIONS.up:
        if (cordY <= 0) return;
        setCords({ x: cordX, y: cordY - 1 });
        break;
      case DIRECTIONS.down:
        if (cordY >= MAP_SQUARES_Y - FRAME_SQUARES_Y) return;
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
          src='/Arts/MapImage.png'
          cordX={cordX}
          cordY={cordY}
        />
        {squares}
        {Object.values(DIRECTIONS).map((direction, idx) =>
          <NavArrow key={idx}
                    direction={direction}
                    onClick={() => moveMap(direction)}
                    src='/Assets/Buttons/map_arrow_button.png'>
          </NavArrow>)}
      </MapFrame>
    </>
  );
};

export default WorldMap;
