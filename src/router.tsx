import React from 'react';
import { createHashRouter } from 'react-router-dom';

import LandingPage from './Pages/LandingPage';
import LobbyPage from './Pages/LobbyPage';

export const routes = { landingPage: '/', lobbyPage: 'lobby' };

export const router = createHashRouter([
  {
    path: routes.landingPage,
    element: <LandingPage />,
  },
  {
    path: routes.lobbyPage,
    element: <LobbyPage />,
  },
]);