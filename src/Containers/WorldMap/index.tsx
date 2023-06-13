import { useContext, useEffect, useState } from 'react';

import AttackView from 'Containers/AttackView';

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

type entityType = null | playerType
type tileType = 'player' | 'empty' | 'barbarians'

export type mapTile = {
  type: tileType;
  entity: entityType;
  army?: null; // for now
  isTarget: boolean;
};

const WorldMap = () => {
  const { gameState } = useContext(GameSessionState);
  const [attackViewOpen, setAttackViewOpen] = useState(false);
  const [targetEntity, setTargetEntity] = useState<entityType>();

  const selfID = Number(localStorage.getItem('playerId') as string);

  useEffect(() => {
    if (gameState.hasGameEnded) {
      router.navigate(routes.leaderboardPage);
    }
  }, [gameState.hasGameEnded]);

  const selfMiddle = () => {
    let middleX = selfX > Math.floor(FRAME_SQUARES_X / 2) ? selfX - Math.floor(FRAME_SQUARES_X / 2) : 0;
    middleX = middleX < MAP_SQUARES_X - FRAME_SQUARES_X ? middleX : MAP_SQUARES_X - FRAME_SQUARES_X;

    let middleY = selfY > Math.floor(FRAME_SQUARES_Y / 2) ? selfY - Math.floor(FRAME_SQUARES_Y / 2) : 0;
    middleY = middleY < MAP_SQUARES_Y - FRAME_SQUARES_Y ? middleY : MAP_SQUARES_Y - FRAME_SQUARES_Y;

    return { x: middleX, y: middleY };
  };

  let BEMap = [
    ...Array.from({ length: MAP_SQUARES_Y }, () => [
      ...Array.from({ length: MAP_SQUARES_X }, () => ({ type: 'empty', army: null, isTarget: false })),
    ]),
  ] as mapTile[][];


  let { x: selfX, y: selfY } = { x: 3, y: 5 };
  gameState.players.forEach((player) => {
    if (player.id === selfID) {
      selfX = player.village.x;
      selfY = player.village.y;
    }
    BEMap[player.village.y][player.village.x] = {
      type: 'player',
      army: null,
      isTarget: false,
      entity: player,
    };
  });
  BEMap[5][3] = {
    type: 'player',
    army: null,
    isTarget: false,
    entity: { village: { x: 3, y: 5 }, id: 6, nickname: 'Tomek' } as playerType,
  };

  const [{ x: cordX, y: cordY }, setCords] = useState(selfMiddle());

  const mapFragment = (map = BEMap.slice(cordY, cordY + FRAME_SQUARES_Y), idx = 0): mapTile[] =>
    map[idx] ? [...map[idx].slice(cordX, cordX + FRAME_SQUARES_X), ...mapFragment(map, idx + 1)] : [];

  const handleCLick = (tileType: tileType, entity: entityType) => {
    if (!entity) return;
    if (tileType === 'player' && entity.id === selfID) {
      router.navigate(routes.villagePage);
      return;
    }
    setTargetEntity(entity);
    setAttackViewOpen(true);
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

  const squares = mapFragment().map(({ type, entity, army, isTarget }, idx) => (
    <MapSquare onClick={() => type !== 'empty' && handleCLick(type, entity)} key={idx}>
      {type === 'player' && (
        <>
          <PlayerNickname>{entity?.nickname}<br />{entity?.id === Number(selfID) && '(you)'}</PlayerNickname>
          <img src='/Assets/castle.png' alt={entity?.nickname as string} width={TILE_WIDTH} height={TILE_HEIGHT} />
        </>
      )}
    </MapSquare>
  ));

  return (
    <Frame>
      <AttackView
        open={attackViewOpen}
        closable={true}
        onCancel={() => setAttackViewOpen(false)}
        width={300}
        keyboard={true}
        footer={false}
        centered={true}
      >

      </AttackView>
      <Map>
        <MapImage src='/Arts/MapImage.png' cordx={cordX} cordy={cordY} />
        {squares}
        {Object.values(DIRECTIONS).map(
          (direction, idx) =>
            !isBoundary(direction) && (
              <NavArrow
                key={idx}
                direction={direction}
                onClick={() => moveMap(direction)}
                src='/Assets/Buttons/map_arrow_button.png'
              />
            ),
        )}
      </Map>
    </Frame>
  );
};

export default WorldMap;
