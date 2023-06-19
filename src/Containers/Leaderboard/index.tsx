import { useContext } from 'react';

import { Col, Row } from 'antd';
import { ColumnsType } from 'antd/es/table';

import GameSessionState, { leaderboardRecord } from 'GameSessionContext';
import { router, routes } from 'router';

import { Background } from 'Components/CommonComponents';
import Button from 'Components/Button';

import { CenteredContainer, StyledLeaderboard, StyledTitle } from './styles';
import './styles.css';

const Leaderboard = () => {
  const { gameState } = useContext(GameSessionState);
  const { leaderboard } = gameState;

  const calculatePlace = (index: number, points: number): number => {
    if (!index || leaderboard[index - 1].points !== points) {
      return index + 1;
    }

    return calculatePlace(index - 1, points);
  };

  const getRowClassname = (record: leaderboardRecord, index: number) => {
    const place = calculatePlace(index, record.points);

    switch (place) {
      case 1:
        return 'first-place';
      case 2:
        return 'second-place';
      case 3:
        return 'third-place';
      default:
        return '';
    }
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
      <CenteredContainer>
        <Row justify='center' gutter={[0, 30]}>
          <Col span={24}>
            <StyledTitle>Leaderboard</StyledTitle>
          </Col>
          <Col span={24}>
            <Row justify='center'>
              <Col xs={{ span: 16 }} md={{ span: 10 }} xl={{ span: 6 }}>
                <StyledLeaderboard
                  columns={columns}
                  dataSource={leaderboard}
                  rowKey={(record) => record.id}
                  rowClassName={getRowClassname}
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
      </CenteredContainer>
    </Background>
  );
};

export default Leaderboard;
