import { createHashRouter, Outlet } from 'react-router-dom';

import LandingPage from 'Pages/LandingPage';
import LobbyPage from 'Pages/LobbyPage';
import VillageView from 'Pages/VillageView';
import WorldPage from 'Pages/WorldPage';

import { GameSessionProvider } from 'GameSessionContext';


export const routes = { landingPage: '/', lobbyPage: 'lobby', villagePage: 'village', worldPage: 'world' };

export const router = createHashRouter([
  {
    path: routes.landingPage,
    element: <LandingPage />,
  },
  {
    element: (
      <GameSessionProvider>
        <Outlet />
      </GameSessionProvider>
    ),
    children: [
      {
        path: routes.lobbyPage,
        element: <LobbyPage />,
      },
      {
        path: routes.worldPage,
        element: <WorldPage />,
      },
      {
        path: routes.villagePage,
        element: <VillageView />,
      },
    ],
  },
]);
