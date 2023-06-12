import { useContext } from 'react';

import { ColumnsType } from 'antd/es/table';

import { leaderboardRecord } from 'GameSessionContext';
import GameSessionState from 'GameSessionContext';
import { StyledTable } from './styles';

const Leaderboard = () => {
  const { gameState } = useContext(GameSessionState);
  const { leaderboard } = gameState;

  const columns: ColumnsType<leaderboardRecord> = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: 'Nickname',
      dataIndex: 'nickname',
      key: 'nickname',
      align: 'center',
    },
    {
      title: 'Points',
      dataIndex: 'points',
      key: 'points',
      align: 'center',
    },
  ];

  return <StyledTable columns={columns} dataSource={leaderboard} rowKey={(record) => record.id}
                      locale={{ emptyText: 'Leaderboard is empty' }} pagination={false} />;
};

export default Leaderboard;
