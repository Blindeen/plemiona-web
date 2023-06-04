import React, { useEffect, useState } from 'react';

type playerType = {
  id: number;
  nickname: string;
};

type resourcesType = {
  owner: playerType;
  players: playerType[];

  wood: number;
  woodIncome: number;
  clay: number;
  clayIncome: number;
  iron: number;
  ironIncome: number;

  warehouse: number;
  lumberjack: number;
  stonePit: number;
  clayPit: number;
  townHall: number;
  barracks: number;
};

const initialResources: resourcesType = {
  owner: { id: 0, nickname: '' },
  players: [] as playerType[],

  wood: 0,
  woodIncome: 1,
  clay: 0,
  clayIncome: 1,
  iron: 0,
  ironIncome: 1,

  warehouse: 1,
  lumberjack: 1,
  stonePit: 1,
  clayPit: 1,
  townHall: 1,
  barracks: 1,
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
