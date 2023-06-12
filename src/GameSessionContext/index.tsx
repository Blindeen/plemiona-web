import React, { useEffect, useRef, useState } from 'react';

import pushNotification from 'pushNotification';

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

export type Building = 'warehouse' | 'sawmill' | 'ironMine' | 'clayPit' | 'townHall' | 'barracks';

export interface BuildingType {
  name: string;
  level: number;
  upgradeDuration: number;
  maxLevel: number;
  upgradeCost: Resources;
}

type gameSessionStateType = {
  hasGameStarted: boolean;

  owner: playerType;
  players: playerType[];

  resources: Resources;
  resourcesIncome: Resources;
  resourcesCapacity: number;

  buildings: Record<Building, BuildingType>;
};

const initialResources: gameSessionStateType = {
  hasGameStarted: false,

  owner: { id: 0, nickname: '', morale: 100, village: { x: 0, y: 0 } },
  players: [] as playerType[],

  resources: { wood: 0, iron: 0, clay: 0 },
  resourcesIncome: { wood: 1, iron: 1, clay: 1 },
  resourcesCapacity: 0,

  buildings: {
    warehouse: {
      name: 'warehouse',
      level: 0,
      maxLevel: 0,
      upgradeCost: { wood: 0, iron: 0, clay: 0 },
      upgradeDuration: 0,
    },
    sawmill: { name: 'sawmill', level: 0, maxLevel: 0, upgradeCost: { wood: 0, iron: 0, clay: 0 }, upgradeDuration: 0 },
    ironMine: {
      name: 'iron_mine',
      level: 0,
      maxLevel: 0,
      upgradeCost: { wood: 0, iron: 0, clay: 0 },
      upgradeDuration: 0,
    },
    clayPit: {
      name: 'clay_pit',
      level: 0,
      maxLevel: 0,
      upgradeCost: { wood: 0, iron: 0, clay: 0 },
      upgradeDuration: 0,
    },
    townHall: {
      name: 'town_hall',
      level: 0,
      maxLevel: 0,
      upgradeCost: { wood: 0, iron: 0, clay: 0 },
      upgradeDuration: 0,
    },
    barracks: {
      name: 'barracks',
      level: 0,
      maxLevel: 0,
      upgradeCost: { wood: 0, iron: 0, clay: 0 },
      upgradeDuration: 0,
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
      const { type, data } = JSON.parse(event.data);

      if (type === 'message') {
        pushNotification('info', data.message);
        return;
      }

      // When game session starts `start_game_session` is received
      // or `fetch_game_session_state` on reconnect to fetch current game state
      if (type === 'start_game_session' || type === 'fetch_game_session_state') {
        setGameState((prevState) => ({
          ...prevState,
          hasGameStarted: true,
        }));
      }

      const updated = Object.fromEntries(Object.entries(data).filter(([key, _]) => gameState.hasOwnProperty(key)));
      setGameState((prevState) => ({ ...prevState, ...updated }));
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
