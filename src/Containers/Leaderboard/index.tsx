import { useContext } from 'react';

import { Col, Row } from 'antd';
import { ColumnsType } from 'antd/es/table';

import GameSessionState, { leaderboardRecord } from 'GameSessionContext';
import { Background } from 'Components/CommonComponents';
import { StyledTable } from 'Components/Table/styles';
import { LayoutContainer, StyledTitle } from './styles';

const Leaderboard = () => {
  const { gameState } = useContext(GameSessionState);
  const { leaderboard } = gameState;

  const columns: ColumnsType<leaderboardRecord> = [
    {
      title: 'Place',
      key: 'place',
      align: 'center',
      render: (value, record, index) => index + 1,
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

  return (
    <Background>
      <LayoutContainer>
        <Row>
          <Col span={12} offset={6}>
            <StyledTitle>Leaderboard</StyledTitle>
          </Col>
        </Row>
        <Row>
          <Col span={6} offset={9}>
            <StyledTable
              columns={columns}
              dataSource={leaderboard}
              rowKey={(record) => record.id}
              locale={{ emptyText: 'Leaderboard is empty' }}
              pagination={false}
            />
          </Col>
        </Row>
      </LayoutContainer>
    </Background>
  );
};

export default Leaderboard;
