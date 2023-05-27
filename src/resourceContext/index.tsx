import React, { useState } from 'react';

type resourcesType = {
  wood:number,
  clay:number,
  steel:number,
}

const initialResources = {
  wood:0,
  clay:0,
  steel:0,
}

type resourcesContextType = {
  resources:resourcesType,
  setResources:(resources:resourcesType) => void
}

export const Resources = React.createContext<resourcesContextType>({resources:initialResources, setResources:() => {}});

export const ResourcesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resources, setResources] = useState(initialResources)
  return <Resources.Provider value={{resources, setResources}}>{children}</Resources.Provider>;
};
