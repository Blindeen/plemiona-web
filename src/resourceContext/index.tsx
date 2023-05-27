import React, { useEffect, useState } from 'react';
import pushNotification from '../pushNotification';

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

  useEffect(() => {
    const socket = new WebSocket(`ws://127.0.0.1:8000/ws/lobby-socket/?token=${localStorage.getItem('token')}`)
    socket.onopen = () => pushNotification('success', 'Joining server', 'Enjoy the game');
    socket.onclose = () => pushNotification('info', 'Lobby no longer exists')

    socket.onmessage = (event) => {
      const {owner, players} = JSON.parse(event.data).data
      console.log(owner)
      console.log(players)
    }

    return () => {
      socket.close()
    }
  }, [])

  return <Resources.Provider value={{resources, setResources}}>{children}</Resources.Provider>;
};
