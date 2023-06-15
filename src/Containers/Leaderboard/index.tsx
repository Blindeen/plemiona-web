import { useContext } from 'react';

import { Col, Row } from 'antd';
import { ColumnsType } from 'antd/es/table';

import GameSessionState, { leaderboardRecord } from 'GameSessionContext';
import { Background } from 'Components/CommonComponents';
import Button from 'Components/Button';
import { LayoutContainer, StyledLeaderboard, StyledTitle } from './styles';
import { router, routes } from 'router';

const Leaderboard = () => {
  const { gameState } = useContext(GameSessionState);
  const { leaderboard } = gameState;

  const calculatePlace = (index: number, points: number): number => {
    if (!index || leaderboard[index - 1].points !== points) {
      return index + 1;
    }

    return calculatePlace(index - 1, points);
  };

  const columns: ColumnsType<leaderboardRecord> = [
    {
      title: 'Place',
      key: 'place',
      align: 'center',
      render: (value, record, index) => calculatePlace(index, record.points),
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
        <Row justify='center' gutter={[0, 20]}>
          <Col span={24}>
            <StyledTitle>Leaderboard</StyledTitle>
          </Col>
          <Col span={24}>
            <Row justify='center'>
              <Col xs={{ span: 14 }} md={{ span: 10 }} xl={{ span: 6 }}>
                <StyledLeaderboard
                  columns={columns}
                  dataSource={leaderboard}
                  rowKey={(record) => record.id}
                  locale={{ emptyText: 'Leaderboard is empty' }}
                  pagination={false}
                />
              </Col>
            </Row>
          </Col>
          <Col>
            <Button onClick={() => router.navigate(routes.landingPage)}>Create/join game</Button>
          </Col>
        </Row>
      </LayoutContainer>
    </Background>
  );
};

export default Leaderboard;
