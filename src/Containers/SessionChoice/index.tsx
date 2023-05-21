import { Col, Row } from 'antd';
import React, { useState } from 'react';

import Button from 'Components/Button';
import Input from 'Components/Input';
import { Box, CenteredContainer, OptionalText, Tags } from 'Components/CommonComponents';
import pushNotification from 'pushNotification';

interface Payload {
  nickname: string;
  game_code: string;
}

interface Response {
  player_id: number;
  game_code: number;
  token: string;
}

const SessionChoice = () => {
  const [nickname, setNickname] = useState<string>('');
  const [gameCode, setGameCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const newSessionButton = 'Create new session';
  const joinSessionButton = 'Join session';

  const onSubmit = async () => {
    const info: Payload = { nickname, game_code: gameCode };
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/game/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(info),
      });
      if (response.ok) {
        const result: Response = await response.json();
        localStorage.setItem('token', result.token);
        localStorage.setItem('player_id', String(result.player_id));
        localStorage.setItem('game_code', String(result.game_code));
        pushNotification('success', 'Joining server', 'Enjoy the game');
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
        <Row gutter={[0, 48]}>
          <Col span={12} offset={6}>
            <Row gutter={[0, 30]}>
              <Col span={24}>
                <Tags>Nickname</Tags>
                <Input maxLength={12} onChange={(e) => setNickname(e.target.value)}></Input>
              </Col>
              <Col span={24}>
                <Tags>
                  Game Code <OptionalText>(Optional)</OptionalText>
                </Tags>
                <Input maxLength={6} onChange={(e) => setGameCode(e.target.value)}></Input>
              </Col>
              <Col span={24}>
                <Button loading={loading} onClick={onSubmit}>
                  {gameCode === '' ? newSessionButton : joinSessionButton}
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </CenteredContainer>
    </Box>
  );
};

export default SessionChoice;
