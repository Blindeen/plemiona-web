import { useContext, useEffect, useState } from 'react';
import { Col, Row, Tooltip } from 'antd';
import { CrownOutlined } from '@ant-design/icons';

import { Box, CenteredContainer, CenteredDiv, Tags } from 'Components/CommonComponents';
import Button from 'Components/Button';

import { PlayerEntry, PlayerList, StartButton } from './styles';
import GameSessionState from 'GameSessionContext';
import pushNotification from 'pushNotification';
import { router } from 'router';
import API_URL from 'api_url';

const Lobby = () => {
  const gameCode = localStorage.getItem('gameCode') as string;
  const selfID = Number(localStorage.getItem('playerId') as string);

  const { gameState } = useContext(GameSessionState);
  const { players, owner } = gameState;
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (gameState.hasGameStarted) {
      localStorage.setItem('hasGameStarted', gameState.hasGameStarted.toString());
      router.navigate('village');
    }
  }, [gameState.hasGameStarted]);

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
      const response = await fetch(`${API_URL}/game/start/`, {
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
                <Tooltip title="Click to copy game code" defaultOpen={true}>
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
