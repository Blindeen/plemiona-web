import React from 'react';
import { createHashRouter, Outlet } from 'react-router-dom';

import LandingPage from 'Pages/LandingPage';
import LobbyPage from 'Pages/LobbyPage';
import VillageView from 'Pages/VillageView';
import { ResourcesProvider } from 'resourceContext';

export const routes = { landingPage: '/', lobbyPage: 'lobby', villagePage: 'village' };

export const router = createHashRouter([
  {
    path: routes.landingPage,
    element: <LandingPage />,
  },
  {
    element: (
      <ResourcesProvider>
        <Outlet />
      </ResourcesProvider>
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
