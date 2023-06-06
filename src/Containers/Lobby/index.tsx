import { useContext, useState } from 'react';
import { Col, Row, Tooltip } from 'antd';
import { CrownOutlined } from '@ant-design/icons';

import { Box, CenteredContainer, CenteredDiv, Tags } from 'Components/CommonComponents';
import Button from 'Components/Button';
import { PlayerEntry, PlayerList, StartButton } from './styles';

import GameSessionState from 'GameSessionContext';
import pushNotification from 'pushNotification';

const Lobby = () => {
  const gameCode = localStorage.getItem('game_code') as string;
  const selfID = Number(localStorage.getItem('player_id') as string);

  const { gameState } = useContext(GameSessionState);
  const { players, owner } = gameState;
  const [loading, setLoading] = useState<boolean>(false);

  const writeToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(gameCode);
      pushNotification('info', 'Game code copied to clipboard');
    } catch {
      pushNotification('error', 'Game code cannot be copied');
    }
  };

  const startGame = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/game/start/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token') as string,
        },
      });
      if (response.ok) {
        pushNotification('success', 'Starting game', 'Enjoy the game');
      } else {
        const { errors } = await response.json();
        Object.entries(errors).forEach(([key, value]) => {
          pushNotification('warning', `${key}: ${(value as string[]).join(' and ')}`);
        });
      }
    } catch (error) {
      pushNotification('error', 'Server down', 'Please check your connection');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <CenteredContainer>
        <Row gutter={[0, 15]}>
          <Col span={16} offset={4}>
            <Row gutter={[10, 20]}>
              <Col span={12}>
                <Tooltip title='Click to copy game code' defaultOpen={true}>
                  <Button onClick={writeToClipboard} style={{ fontFamily: 'Arial' }}>
                    {gameCode}
                  </Button>
                </Tooltip>
              </Col>
              <Col span={12}>
                <StartButton onClick={startGame} loading={loading} disabled={players.length < 2 || selfID !== owner.id}>
                  Start
                </StartButton>
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
                  {players.map(({ nickname, id }) => (
                    <PlayerEntry key={id}>
                      {id === owner.id && <CrownOutlined />}
                      {nickname}
                    </PlayerEntry>
                  ))}
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
