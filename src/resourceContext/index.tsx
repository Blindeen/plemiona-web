import React, { useEffect, useState } from 'react';
import pushNotification from '../pushNotification';

type resourcesType = {
  wood:number,
  woodIncome: number,
  clay:number,
  clayIncome:number,
  steel:number,
  steelIncome:number,
}

const initialResources = {
  wood:0,
  woodIncome: 1,
  clay:0,
  clayIncome:1,
  steel:0,
  steelIncome:1,
}

type resourcesContextType = {
  resources:resourcesType,
  setResources:(resources:resourcesType) => void
}

export const Resources = React.createContext<resourcesContextType>({resources:initialResources, setResources:() => {}});

export const ResourcesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resources, setResources] = useState(initialResources)

  useEffect(() => {
    const socket = new WebSocket(`ws://127.0.0.1:8000/ws/lobby-socket/?token=${localStorage.getItem('token')}`)
    socket.onopen = () => pushNotification('success', 'Joining server', 'Enjoy the game');
    socket.onclose = () => pushNotification('info', 'Lobby no longer exists')

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data).data
      Object.entries(data).forEach(([key, value]) =>
        resources.hasOwnProperty(key) && setResources({...resources, [key]:value})
      )
    }

    return () => {
      socket.close()
    }
  }, [])

  return <Resources.Provider value={{resources, setResources}}>{children}</Resources.Provider>;
};
