import {createBrowserRouter, Outlet} from 'react-router-dom';

import LandingPage from 'Pages/LandingPage';
import LobbyPage from 'Pages/LobbyPage';
import VillagePage from 'Pages/VillagePage';
import WorldPage from 'Pages/WorldPage';
import LeaderboardPage from 'Pages/LeaderboardPage';

import { GameSessionProvider } from 'GameSessionContext';

import { PrivateRoute } from 'privateRoute';
import { hasGameEnded, hasGameStarted, isAuthenticated } from 'utils';
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage";

export const routes = {
  landingPage: '/',
  loginPage: 'login',
  forgotPasswordPage: 'forgot-password',
  resetPasswordPage: 'reset-password/:token',
  registerPage: 'register',
  lobbyPage: 'lobby',
  villagePage: 'village',
  worldPage: 'world',
  leaderboardPage: 'leaderboard',
};

export const router = createBrowserRouter([
  {
    path: routes.landingPage,
    element: <LandingPage />,
  },
  {
    path: routes.loginPage,
    element: <LoginPage />,
  },
  {
    path: routes.forgotPasswordPage,
    element: <ForgotPasswordPage />,
  },
  {
    path: routes.resetPasswordPage,
    element: <ResetPasswordPage />,
  },
  {
    path: routes.registerPage,
    element: <RegisterPage />,
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
