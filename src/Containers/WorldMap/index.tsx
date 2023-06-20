import { useContext, useEffect, useState } from 'react';
import { Tooltip } from 'antd';

import 'App.css';
import AttackView, { UnitDistributionWrapper, UnitSlider, UnitWrapper } from 'Containers/AttackView';
import { UnitImg } from 'Components/UnitComponent/styles';

import GameSessionState, { playerType, UnitInterface, UnitType } from 'GameSessionContext';
import { router, routes } from 'router';
import pushNotification from 'pushNotification';
import API_URL from 'api_url';
import {
  AttackButton,
  Description,
  direction,
  DIRECTIONS,
  Frame,
  FRAME_SQUARES_X,
  FRAME_SQUARES_Y,
  Header,
  Map,
  MAP_SQUARES_X,
  MAP_SQUARES_Y,
  MapImage,
  MapSquare,
  NavArrow,
  PlayerNickname,
  TILE_HEIGHT,
  TILE_WIDTH,
  VillageImg,
  VillageReturnButton,
} from './styles';
import { stringToTitle } from 'utils';
import { InputNumber } from 'Components/Input';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

type entityType = null | playerType;
type tileType = 'player' | 'empty' | 'barbarians';

export type mapTile = {
  type: tileType;
  entity: entityType;
  army?: null; // for now
  isTarget: boolean;
};

const WorldMap = () => {
  const { gameState } = useContext(GameSessionState);
  const [attackViewOpen, setAttackViewOpen] = useState(false);
  const [attackingUnits, setAttackingUnits] = useState<Record<UnitType, number>>({
    spearman: 0,
    archer: 0,
    axeman: 0,
    swordsman: 0,
  });
  const [targetEntity, setTargetEntity] = useState<entityType>();
  const [loading, setLoading] = useState(false);

  const selfID = Number(localStorage.getItem('playerId') as string);

  useEffect(() => {
    if (gameState.hasGameEnded) {
      localStorage.setItem('hasGameEnded', gameState.hasGameEnded.toString());
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

  let selfX = 0;
  let selfY = 0;

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

  const [{ x: cordX, y: cordY }, setCords] = useState(selfMiddle());

  const mapFragment = (map = BEMap.slice(cordY, cordY + FRAME_SQUARES_Y), idx = 0): mapTile[] =>
    map[idx] ? [...map[idx].slice(cordX, cordX + FRAME_SQUARES_X), ...mapFragment(map, idx + 1)] : [];

  const handleTileClick = async (tileType: tileType, entity: entityType) => {
    if (!entity) return;

    if (tileType === 'player' && entity.id === selfID) {
      await router.navigate(routes.villagePage);
      return;
    }

    setTargetEntity(entity);
    setAttackViewOpen(true);
  };

  const handleAttackClick = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/game/attack/${targetEntity?.id}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token') as string,
        },
        body: JSON.stringify({
          units: [
            { name: 'archer', count: attackingUnits.archer },
            { name: 'axeman', count: attackingUnits.axeman },
            { name: 'spearman', count: attackingUnits.spearman },
            { name: 'swordsman', count: attackingUnits.swordsman },
          ],
        }),
      });
      if (response.ok) {
        pushNotification('success', `You are attacking ${targetEntity?.nickname}`);
      } else {
        const { errors } = await response.json();
        Object.entries(errors).forEach(([key, value]) => {
          pushNotification('warning', `${key}: ${(value as string[]).join(' and ')}`);
        });
      }
    } catch (error) {
      pushNotification('error', 'Server down', 'Please check your connection');
    } finally {
      setLoading(false);
      setAttackViewOpen(false);
      setAttackingUnits({ spearman: 0, archer: 0, axeman: 0, swordsman: 0 });
    }
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
    <MapSquare onClick={() => type !== 'empty' && handleTileClick(type, entity)} key={idx}>
      {type === 'player' && (
        <>
          <PlayerNickname>
            {entity?.nickname}
            <br />
            {entity?.id === Number(selfID) && '(you)'}
          </PlayerNickname>
          <VillageImg
            className="clickable"
            src="/assets/castle.png"
            alt={entity?.nickname as string}
            width={TILE_WIDTH}
            height={TILE_HEIGHT}
          />
        </>
      )}
    </MapSquare>
  ));

  const estimateBattleTime = (target?: entityType): string => {
    if (!target) return '';

    const distance = Math.sqrt(
      Math.pow(selfX - target.village.x, 2) + Math.pow((selfY - target.village.y) as number, 2)
    );

    // Get slowest unit from attacking army
    let slowestUnit: UnitInterface | null = null;

    Object.entries(attackingUnits).forEach(([name, count]) => {
      if (count === 0) return;
      const unit: UnitInterface = gameState.units[name as UnitType];
      if (!slowestUnit || slowestUnit.speed <= unit.speed) slowestUnit = unit;
    });

    if (!slowestUnit) return '';
    const seconds = distance * (slowestUnit as UnitInterface).speed;
    const duration = dayjs.duration(seconds, 'seconds');

    return `${duration.minutes()}m ${duration.seconds()}s`;
  };

  const attackModal = (
    <AttackView
      open={attackViewOpen}
      onCancel={() => setAttackViewOpen(false)}
      footer={false}
      keyboard
      centered
      closable
    >
      <Header style={{ textAlign: 'center' }}>
        Select units to attack
        <br />
        {targetEntity?.nickname}
      </Header>
      <Description>
        {(attackingUnits.spearman > 0 ||
          attackingUnits.axeman > 0 ||
          attackingUnits.archer > 0 ||
          attackingUnits.swordsman > 0) &&
          `The units would arrive in ${estimateBattleTime(targetEntity)}`}
      </Description>
      <UnitDistributionWrapper>
        {Object.entries(gameState.units).map(([name, { count }], idx) => {
          const unitType = name as UnitType;
          return (
            <UnitWrapper key={idx}>
              <Tooltip title={stringToTitle(name)} placement="top">
                <UnitImg type={name} width={64} height={64} />
              </Tooltip>
              <p>Quantity: {count}</p>
              <InputNumber
                disabled={count === 0}
                min={0}
                max={count}
                defaultValue={0}
                value={attackingUnits[unitType]}
                onChange={(value) => setAttackingUnits((prevState) => ({ ...prevState, [unitType]: value }))}
              />
              <UnitSlider
                disabled={count === 0}
                min={0}
                max={count}
                value={attackingUnits[unitType]}
                onChange={(value: number) => setAttackingUnits((prevState) => ({ ...prevState, [unitType]: value }))}
                keyboard
              />
            </UnitWrapper>
          );
        })}
      </UnitDistributionWrapper>
      <AttackButton loading={loading} onClick={() => handleAttackClick()}>
        Attack
      </AttackButton>
    </AttackView>
  );

  return (
    <Frame>
      {attackModal}
      <Map>
        <MapImage src="/assets/map-image.jpg" cordx={cordX} cordy={cordY} />
        <VillageReturnButton className="clickable" onClick={resetView} />
        {squares}
        {Object.values(DIRECTIONS).map(
          (direction, idx) =>
            !isBoundary(direction) && (
              <NavArrow
                key={idx}
                className="clickable"
                direction={direction}
                onClick={() => moveMap(direction)}
                src="/assets/buttons/map-arrow-button.png"
              />
            )
        )}
      </Map>
    </Frame>
  );
};

export default WorldMap;
