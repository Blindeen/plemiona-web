import { useEffect } from 'react';

import Leaderboard from 'Containers/Leaderboard';

const LeaderboardPage = () => {
  useEffect(() => localStorage.clear());

  return <Leaderboard />;
};

export default LeaderboardPage;
