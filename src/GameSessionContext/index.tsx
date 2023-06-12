import React, { useEffect, useRef, useState } from 'react';
import merge from 'lodash.merge';

export type Resource = 'wood' | 'clay' | 'iron';
export type Resources = Record<Resource, number>;

interface Village {
  x: number;
  y: number;
}

export type playerType = {
  id: number;
  nickname: string;
  morale: number;
  village: Village;
};

export type BuildingType = 'warehouse' | 'sawmill' | 'ironMine' | 'clayPit' | 'townHall' | 'barracks';
export type UnitType = 'spearman' | 'archer' | 'axeman' | 'swordsman';

export interface BuildingInterface {
  level: number;
  upgradeDuration: number;
  maxLevel: number;
  upgradeCost: Resources;
}

export interface UnitInterface {
  count: number;
  speed: number;
  trainingCost: Resources;
  trainingDuration: number;
  carryingCapacity: number;
  offensiveStrength: number;
  defensiveStrength: number;
}

type gameSessionStateType = {
  owner: playerType;
  players: playerType[];

  resources: Resources;
  resourcesIncome: Resources;
  resourcesCapacity: number;

  buildings: Record<BuildingType, BuildingInterface>;
  units: Record<UnitType, UnitInterface>;
};

const initialResources: gameSessionStateType = {
  owner: { id: 0, nickname: '', morale: 100, village: { x: 0, y: 0 } },
  players: [] as playerType[],

  resources: { wood: 0, iron: 0, clay: 0 },
  resourcesIncome: { wood: 1, iron: 1, clay: 1 },
  resourcesCapacity: 0,

  buildings: {
    warehouse: {
      level: 0,
      maxLevel: 0,
      upgradeCost: { wood: 0, iron: 0, clay: 0 },
      upgradeDuration: 0,
    },
    sawmill: {
      level: 0,
      maxLevel: 0,
      upgradeCost: { wood: 0, iron: 0, clay: 0 },
      upgradeDuration: 0,
    },
    ironMine: {
      level: 0,
      maxLevel: 0,
      upgradeCost: { wood: 0, iron: 0, clay: 0 },
      upgradeDuration: 0,
    },
    clayPit: {
      level: 0,
      maxLevel: 0,
      upgradeCost: { wood: 0, iron: 0, clay: 0 },
      upgradeDuration: 0,
    },
    townHall: {
      level: 0,
      maxLevel: 0,
      upgradeCost: { wood: 0, iron: 0, clay: 0 },
      upgradeDuration: 0,
    },
    barracks: {
      level: 0,
      maxLevel: 0,
      upgradeCost: { wood: 0, iron: 0, clay: 0 },
      upgradeDuration: 0,
    },
  },
  units: {
    archer: {
      count: 0,
      speed: 0,
      trainingCost: { wood: 0, iron: 0, clay: 0 },
      trainingDuration: 0,
      carryingCapacity: 0,
      offensiveStrength: 0,
      defensiveStrength: 0,
    },
    spearman: {
      count: 0,
      speed: 0,
      trainingCost: { wood: 0, iron: 0, clay: 0 },
      trainingDuration: 0,
      carryingCapacity: 0,
      offensiveStrength: 0,
      defensiveStrength: 0,
    },
    swordsman: {
      count: 0,
      speed: 0,
      trainingCost: { wood: 0, iron: 0, clay: 0 },
      trainingDuration: 0,
      carryingCapacity: 0,
      offensiveStrength: 0,
      defensiveStrength: 0,
    },
    axeman: {
      count: 0,
      speed: 0,
      trainingCost: { wood: 0, iron: 0, clay: 0 },
      trainingDuration: 0,
      carryingCapacity: 0,
      offensiveStrength: 0,
      defensiveStrength: 0,
    },
  },
};

type GameSessionContextType = {
  gameState: gameSessionStateType;
  setGameState: (resources: gameSessionStateType) => void;
};

const GameSessionState = React.createContext<GameSessionContextType>({
  gameState: initialResources,
  setGameState: () => {},
});
export default GameSessionState;

export const GameSessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState(initialResources);
  const resourceUpdater = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const socket = new WebSocket(`ws://127.0.0.1:8000/ws/?token=${localStorage.getItem('token')}`);

    socket.onmessage = async (event) => {
      clearTimeout(resourceUpdater.current);
      const { data } = JSON.parse(event.data);

      const updated = Object.fromEntries(Object.entries(data).filter(([key, _]) => gameState.hasOwnProperty(key)));
      setGameState((prevState) => merge({}, prevState, updated));
    };
    return () => socket.close();
  }, []);

  useEffect(() => {
    resourceUpdater.current = setTimeout(() => {
      setGameState((prevState) => ({
        ...prevState,
        resources: Object.fromEntries(
          Object.entries(prevState.resources).map(([key, quantity]) =>
            quantity < prevState.resourcesCapacity
              ? [key, quantity + prevState.resourcesIncome[key as Resource]]
              : [key, quantity]
          )
        ) as Resources,
      }));
    }, 1000);
    return () => clearTimeout(resourceUpdater.current);
  }, [gameState]);

  return <GameSessionState.Provider value={{ gameState, setGameState }}>{children}</GameSessionState.Provider>;
};
