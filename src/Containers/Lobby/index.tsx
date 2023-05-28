import { useContext } from 'react';
import { Col, Row } from 'antd';
import { CrownOutlined } from '@ant-design/icons';

import { Box, CenteredContainer, CenteredDiv, Tags } from 'Components/CommonComponents';
import Button from 'Components/Button';
import { PlayerEntry, PlayerList, StartButton } from './styles';

import Resources from '../../resourceContext';

const Lobby = () => {
  const gameCode = localStorage.getItem('game_code') as string;
  const { resources } = useContext(Resources);
  const { players, owner } = resources;

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
                <StartButton disabled={players.length < 2}>Start</StartButton>
              </Col>
            </Row>
          </Col>
          <Col span={14} offset={5}>
            <Row gutter={[0, 10]}>
              <Col span={24}>
                <CenteredDiv>
                  <Tags>Players {players.length}/8</Tags>
                </CenteredDiv>
              </Col>
              <Col span={24}>
                <PlayerList>
                  {players.map(({ nickname, id }) =>
                    <PlayerEntry key={id}>
                      {id === owner.id && <CrownOutlined />}
                      {nickname}
                    </PlayerEntry>)}
                </PlayerList>
              </Col>
            </Row>
          </Col>
        </Row>
      </CenteredContainer>
    </Box>
  );
};

export default Lobby;
