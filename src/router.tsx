import { createHashRouter, Outlet } from 'react-router-dom';

import LandingPage from 'Pages/LandingPage';
import LobbyPage from 'Pages/LobbyPage';
import VillagePage from 'Pages/VillagePage';
import WorldPage from 'Pages/WorldPage';
import LeaderboardPage from 'Pages/LeaderboardPage';

import { GameSessionProvider } from 'GameSessionContext';

import { PrivateRoute } from 'privateRoute';
import { hasGameEnded, hasGameStarted, isAuthenticated } from 'utils';

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
        element: <PrivateRoute
          children={<LobbyPage />}
          redirectPath={routes.landingPage}
          isAuthenticated={isAuthenticated}
        />,
      },
      {
        path: routes.worldPage,
        element: <PrivateRoute
          children={<WorldPage />}
          redirectPath={routes.landingPage}
          isAuthenticated={() => isAuthenticated() && hasGameStarted()}
        />,
      },
      {
        path: routes.villagePage,
        element: <PrivateRoute
          children={<VillagePage />}
          redirectPath={routes.landingPage}
          isAuthenticated={() => isAuthenticated() && hasGameStarted()}
        />,
      },
      {
        path: routes.leaderboardPage,
        element: <PrivateRoute
          children={<LeaderboardPage />}
          redirectPath={routes.landingPage}
          isAuthenticated={() => isAuthenticated() && hasGameEnded()}
        />,
      },
    ],
  },
]);
