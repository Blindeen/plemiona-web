import React from 'react';
import { createHashRouter, Outlet } from 'react-router-dom';

import LandingPage from 'Pages/LandingPage';
import LobbyPage from 'Pages/LobbyPage';
import { ResourcesProvider } from 'resourceContext';

export const routes = { landingPage: '/', lobbyPage: 'lobby' };

export const router = createHashRouter([
  {
    path: routes.landingPage,
    element: <LandingPage />,
  },
  {
    element:
      <ResourcesProvider>
        <Outlet />
      </ResourcesProvider>,
    children: [
      {
        path: routes.lobbyPage,
        element: <LobbyPage />,
      },
    ],
  },
]);
