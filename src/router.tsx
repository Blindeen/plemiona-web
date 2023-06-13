import { createHashRouter, Outlet } from 'react-router-dom';

import LandingPage from 'Pages/LandingPage';
import LobbyPage from 'Pages/LobbyPage';
import VillagePage from 'Pages/VillagePage';
import WorldPage from 'Pages/WorldPage';
import LeaderboardPage from 'Pages/LeaderboardPage';

import { GameSessionProvider } from 'GameSessionContext';

export const routes = {
  landingPage: '/',
  lobbyPage: 'lobby',
  villagePage: 'village',
  worldPage: 'world',
  leaderboardPage: 'leaderboard',
};

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
        element: <VillagePage />,
      },
      {
        path: routes.leaderboardPage,
        element: <LeaderboardPage />,
      },
    ],
  },
]);
