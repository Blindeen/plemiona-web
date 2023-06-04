import React, { useEffect, useState } from 'react';

type playerType = {
  id: number;
  nickname: string;
};

interface Resources {
  wood: number;
  clay: number;
  iron: number;
}

interface Building {
  name: string;
  lvl: number;
  maxLvl: number;
  upgradeCost: Resources;
  upgradeDuration: number;
}

type resourcesType = {
  owner: playerType;
  players: playerType[];

  morale: number;

  resources: Resources;
  resourcesIncome: Resources;
  resourcesCapacity: number;

  warehouse: Building;
  sawmill: Building;
  ironMine: Building;
  clayPit: Building;
  townHall: Building;
  barracks: Building;
};

const initialResources: resourcesType = {
  owner: { id: 0, nickname: '' },
  players: [] as playerType[],

  morale: 100,

  resources: { wood: 0, iron: 0, clay: 0 },
  resourcesIncome: { wood: 1, iron: 1, clay: 1 },
  resourcesCapacity: 0,

  warehouse: { name: '', lvl: 0, maxLvl: 0, upgradeCost: { wood: 0, iron: 0, clay: 0 }, upgradeDuration: 0 },
  sawmill: { name: '', lvl: 0, maxLvl: 0, upgradeCost: { wood: 0, iron: 0, clay: 0 }, upgradeDuration: 0 },
  ironMine: { name: '', lvl: 0, maxLvl: 0, upgradeCost: { wood: 0, iron: 0, clay: 0 }, upgradeDuration: 0 },
  clayPit: { name: '', lvl: 0, maxLvl: 0, upgradeCost: { wood: 0, iron: 0, clay: 0 }, upgradeDuration: 0 },
  townHall: { name: '', lvl: 0, maxLvl: 0, upgradeCost: { wood: 0, iron: 0, clay: 0 }, upgradeDuration: 0 },
  barracks: { name: '', lvl: 0, maxLvl: 0, upgradeCost: { wood: 0, iron: 0, clay: 0 }, upgradeDuration: 0 },
};

type resourcesContextType = {
  resources: resourcesType;
  setResources: (resources: resourcesType) => void;
};

const Resources = React.createContext<resourcesContextType>({
  resources: initialResources,
  setResources: () => {},
});
export default Resources;

export const ResourcesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resources, setResources] = useState(initialResources);

  useEffect(() => {
    const socket = new WebSocket(`ws://127.0.0.1:8000/ws/?token=${localStorage.getItem('token')}`);

    socket.onmessage = (event) => {
      const { type, data } = JSON.parse(event.data);

      const updated = Object.fromEntries(Object.entries(data).filter(([key, _]) => resources.hasOwnProperty(key)));
      setResources({ ...resources, ...updated });
    };

    return () => socket.close();
  }, []);

  return <Resources.Provider value={{ resources, setResources }}>{children}</Resources.Provider>;
};
