import React from 'react';
import { createHashRouter, Outlet } from 'react-router-dom';

import LandingPage from 'Pages/LandingPage';
import LobbyPage from 'Pages/LobbyPage';
import VillageView from 'Pages/VillageView';
import { GameSessionProvider } from 'GameSessionContext';

export const routes = { landingPage: '/', lobbyPage: 'lobby', villagePage: 'village' };

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
        path: routes.villagePage,
        element: <VillageView />,
      },
    ],
  },
]);
