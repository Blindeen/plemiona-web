import { Col, Row } from 'antd';

import Leaderboard from 'Containers/Leaderboard';
import { Background } from 'Components/CommonComponents';

const LeaderboardPage = () => {
  return (
    <Background>
      <Row>
        <Col span={8} offset={8}>
          <Leaderboard />
        </Col>
      </Row>
    </Background>
  );
};

export default LeaderboardPage;
