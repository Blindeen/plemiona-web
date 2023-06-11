import { StyledTable } from 'Containers/Leaderboard/styles';

import GameSessionState from 'GameSessionContext';

interface PlayerRecord {
  id: number;
  nickname: string;
  points: number;
}

const Leaderboard = () => {
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nickname',
      dataIndex: 'nickname',
      key: 'nickname',
    },
    {
      title: 'Points',
      dataIndex: 'points',
      key: 'points',
    },
  ];

  const data: PlayerRecord[] = [
    {
      id: 5,
      nickname: 'Kuba',
      points: 150,
    },
    {
      id: 5,
      nickname: 'Kuba',
      points: 150,
    },
    {
      id: 5,
      nickname: 'Kuba',
      points: 150,
    },
  ];

  return <StyledTable columns={columns} dataSource={data} pagination={false} />;
};

export default Leaderboard;
