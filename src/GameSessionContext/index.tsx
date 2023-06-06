import React, { useEffect, useState } from 'react';

export interface Resources {
  wood: number;
  clay: number;
  iron: number;
}

interface Village {
  x: number;
  y: number;
}

type playerType = {
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
  setGameState: () => {
  },
});
export default GameSessionState;

export const GameSessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState(initialResources);

  useEffect(() => {
    const socket = new WebSocket(`ws://127.0.0.1:8000/ws/?token=${localStorage.getItem('token')}`);

    socket.onmessage = (event) => {
      const { data } = JSON.parse(event.data);

      const updated = Object.fromEntries(Object.entries(data).filter(([key, _]) => gameState.hasOwnProperty(key)));
      setGameState({ ...gameState, ...updated });
    };

    return () => socket.close();
  }, []);

  return <GameSessionState.Provider value={{ gameState, setGameState }}>{children}</GameSessionState.Provider>;
};
