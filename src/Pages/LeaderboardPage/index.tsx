import { Col, Row } from 'antd';

import Leaderboard from 'Containers/Leaderboard';
import { Background } from 'Components/CommonComponents';
import { LayoutContainer, StyledTitle } from 'Pages/LeaderboardPage/styles';

const LeaderboardPage = () => {
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
            <Leaderboard />
          </Col>
        </Row>
      </LayoutContainer>
    </Background>
  );
};

export default LeaderboardPage;
