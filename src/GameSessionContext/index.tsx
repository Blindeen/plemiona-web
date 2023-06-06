import React, { useEffect, useRef, useState } from 'react';
import { router, routes } from 'router';

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

interface Building {
  name: string;
  lvl: number;
  upgradeDuration: number;
  maxLvl: number;
  upgradeCost: Resources;
}

type gameSessionStateType = {
  owner: playerType;
  players: playerType[];

  resources: Resources;
  resourcesIncome: Resources;
  resourcesCapacity: number;

  buildings: {
    warehouse: Building;
    sawmill: Building;
    ironMine: Building;
    clayPit: Building;
    townHall: Building;
    barracks: Building;
  };
};

const initialResources: gameSessionStateType = {
  owner: { id: 0, nickname: '', morale: 100, village: { x: 0, y: 0 } },
  players: [] as playerType[],

  resources: { wood: 0, iron: 0, clay: 0 },
  resourcesIncome: { wood: 1, iron: 1, clay: 1 },
  resourcesCapacity: 0,

  buildings: {
    warehouse: { name: '', lvl: 0, maxLvl: 0, upgradeCost: { wood: 0, iron: 0, clay: 0 }, upgradeDuration: 0 },
    sawmill: { name: '', lvl: 0, maxLvl: 0, upgradeCost: { wood: 0, iron: 0, clay: 0 }, upgradeDuration: 0 },
    ironMine: { name: '', lvl: 0, maxLvl: 0, upgradeCost: { wood: 0, iron: 0, clay: 0 }, upgradeDuration: 0 },
    clayPit: { name: '', lvl: 0, maxLvl: 0, upgradeCost: { wood: 0, iron: 0, clay: 0 }, upgradeDuration: 0 },
    townHall: { name: '', lvl: 0, maxLvl: 0, upgradeCost: { wood: 0, iron: 0, clay: 0 }, upgradeDuration: 0 },
    barracks: { name: '', lvl: 0, maxLvl: 0, upgradeCost: { wood: 0, iron: 0, clay: 0 }, upgradeDuration: 0 },
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
      const { type, data } = JSON.parse(event.data);

      const updated = Object.fromEntries(Object.entries(data).filter(([key, _]) => gameState.hasOwnProperty(key)));
      setGameState((prevState) => ({ ...prevState, ...updated }));

      if (type === 'start_game_session') {
        await router.navigate(routes.worldPage);
      }
    };

    return () => socket.close();
  }, []);

  useEffect(() => {
    resourceUpdater.current = setTimeout(() => {
      setGameState({
        ...gameState,
        resources: {
          wood: gameState.resources.wood + gameState.resourcesIncome.wood,
          iron: gameState.resources.iron + gameState.resourcesIncome.iron,
          clay: gameState.resources.clay + gameState.resourcesIncome.clay,
        },
      });
    }, 1000);

    return () => clearTimeout(resourceUpdater.current);
  }, [gameState]);

  return <GameSessionState.Provider value={{ gameState, setGameState }}>{children}</GameSessionState.Provider>;
};
