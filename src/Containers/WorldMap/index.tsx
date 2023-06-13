import { useContext, useEffect, useState } from 'react';

import GameSessionState, { playerType } from 'GameSessionContext';
import { router, routes } from 'router';
import {
  direction,
  DIRECTIONS,
  Frame,
  FRAME_SQUARES_X,
  FRAME_SQUARES_Y,
  Map,
  MAP_SQUARES_X,
  MAP_SQUARES_Y,
  MapImage,
  MapSquare,
  NavArrow,
  PlayerNickname,
  TILE_HEIGHT,
  TILE_WIDTH,
} from './styles';

export type mapTile = {
  type: 'player' | 'empty' | 'barbarians';
  player?: playerType;
  army?: null; // for now
  isTarget: boolean;
};

const WorldMap = () => {
  const { gameState } = useContext(GameSessionState);

  useEffect(() => {
    if (gameState.hasGameEnded) {
      router.navigate(routes.leaderboardPage);
    }
  }, [gameState.hasGameEnded]);

  const { x: selfX, y: selfY } = { x: 3, y: 5 };

  const selfMiddle = () => {
    let middleX = selfX > Math.floor(FRAME_SQUARES_X / 2) ? selfX - Math.floor(FRAME_SQUARES_X / 2) : 0;
    middleX = middleX < MAP_SQUARES_X - FRAME_SQUARES_X ? middleX : MAP_SQUARES_X - FRAME_SQUARES_X;

    let middleY = selfY > Math.floor(FRAME_SQUARES_Y / 2) ? selfY - Math.floor(FRAME_SQUARES_Y / 2) : 0;
    middleY = middleY < MAP_SQUARES_Y - FRAME_SQUARES_Y ? middleY : MAP_SQUARES_Y - FRAME_SQUARES_Y;

    return { x: middleX, y: middleY };
  };

  const [{ x: cordX, y: cordY }, setCords] = useState(selfMiddle());

  let BEMap = [
    ...Array.from({ length: MAP_SQUARES_Y }, () => [
      ...Array.from({ length: MAP_SQUARES_X }, () => ({ type: 'empty', army: null, isTarget: false })),
    ]),
  ] as mapTile[][];

  gameState.players.forEach((player) => {
    BEMap[player.village.y][player.village.x] = {
      type: 'player',
      army: null,
      isTarget: false,
      player,
    };
  });

  const mapFragment = (map = BEMap.slice(cordY, cordY + FRAME_SQUARES_Y), idx = 0): mapTile[] =>
    map[idx] ? [...map[idx].slice(cordX, cordX + FRAME_SQUARES_X), ...mapFragment(map, idx + 1)] : [];

  const calculateAbsolute = (relativeIdx: number) => [
    (relativeIdx % FRAME_SQUARES_X) + cordX,
    Math.floor(relativeIdx / FRAME_SQUARES_X) + cordY,
  ];

  const handleCLick = (relativeIdx: number) => {
    const [absoluteX, absoluteY] = calculateAbsolute(relativeIdx);
    console.log(`${absoluteX} ${absoluteY}`);
    //request with cords
  };

  const isBoundary = (direction: direction) => {
    switch (direction) {
      case DIRECTIONS.left:
        return cordX <= 0;
      case DIRECTIONS.right:
        return cordX >= MAP_SQUARES_X - FRAME_SQUARES_X;
      case DIRECTIONS.up:
        return cordY <= 0;
      case DIRECTIONS.down:
        return cordY >= MAP_SQUARES_Y - FRAME_SQUARES_Y;
    }
  };

  const moveMap = (direction: direction) => {
    if (isBoundary(direction)) return;

    switch (direction) {
      case DIRECTIONS.left:
        setCords({ x: cordX - 1, y: cordY });
        break;
      case DIRECTIONS.right:
        setCords({ x: cordX + 1, y: cordY });
        break;
      case DIRECTIONS.up:
        setCords({ x: cordX, y: cordY - 1 });
        break;
      case DIRECTIONS.down:
        setCords({ x: cordX, y: cordY + 1 });
        break;
    }
  };

  const resetView = () => setCords(selfMiddle());

  const squares = mapFragment().map(({ type, player, army, isTarget }, idx) => (
    <MapSquare onClick={() => type !== 'empty' && handleCLick(idx)} key={idx}>
      {type === 'player' && (
        <>
          <PlayerNickname>{player?.nickname}</PlayerNickname>
          <img src="/Assets/castle.png" alt={player?.nickname} width={TILE_WIDTH} height={TILE_HEIGHT} />
        </>
      )}
    </MapSquare>
  ));

  return (
    <Frame>
      <Map>
        <MapImage src='/assets/map-image.jpg' cordx={cordX} cordy={cordY} />
        {squares}
        {Object.values(DIRECTIONS).map(
          (direction, idx) =>
            !isBoundary(direction) && (
              <NavArrow
                key={idx}
                direction={direction}
                onClick={() => moveMap(direction)}
                src='/assets/buttons/map-arrow-button.png'
              />
            )
        )}
      </Map>
    </Frame>
  );
};

export default WorldMap;
