import { Col, Row } from 'antd';
import React, { useState } from 'react';

import Button from 'Components/Button';
import Input from 'Components/Input';
import { Box, CenteredContainer, OptionalText, Tags } from './styles';

interface Payload {
  nickname: string;
  game_code: string;
}

const SessionChoice = () => {
  const [nickname, setNickname] = useState<string>('');
  const [gameCode, setGameCode] = useState<string>('');

  const newSessionButton = 'Create new session';
  const joinSessionButton = 'Join session';

  const onSubmit = async () => {
    const info: Payload = { nickname, game_code: gameCode };
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/game/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(info),
      });
      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
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
                <Button onClick={onSubmit}>{gameCode === '' ? newSessionButton : joinSessionButton}</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </CenteredContainer>
    </Box>
  );
};

export default SessionChoice;
