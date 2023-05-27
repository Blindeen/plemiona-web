import { useState } from 'react';
import { Col, Row } from 'antd';

import { Box, CenteredContainer, CenteredDiv, Tags } from 'Components/CommonComponents';
import Button from 'Components/Button';
import { PlayerList, StartButton } from './styles';

const Lobby = () => {
  const gameCode = localStorage.getItem('game_code') as string;
  const [playerCount, _] = useState(1);

  return (
    <Box>
      <CenteredContainer>
        <Row gutter={[0, 15]}>
          <Col span={16} offset={4}>
            <Row gutter={[10, 20]}>
              <Col span={12}>
                <Button onClick={() => navigator.clipboard.writeText(gameCode)} style={{ fontFamily: 'Arial' }}>
                  {gameCode}
                </Button>
              </Col>
              <Col span={12}>
                <StartButton disabled={playerCount < 2}>Start</StartButton>
              </Col>
            </Row>
          </Col>
          <Col span={14} offset={5}>
            <Row gutter={[0, 10]}>
              <Col span={24}>
                <CenteredDiv>
                  <Tags>Players {playerCount}/8</Tags>
                </CenteredDiv>
              </Col>
              <Col span={24}>
                <PlayerList />
              </Col>
            </Row>
          </Col>
        </Row>
      </CenteredContainer>
    </Box>
  );
};

export default Lobby;
