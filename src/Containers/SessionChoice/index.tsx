import { Col, Row } from 'antd';
import { useState } from 'react';

import { Box, CenteredContainer, OptionalText, StyledImage, Tags } from 'Components/CommonComponents';
import { StyledButton, StyledInput } from 'Pages/LandingPage/styles';

import pushNotification from 'pushNotification';
import { router, routes } from 'router';
import API_URL from 'api_url';


interface Payload {
  nickname: string;
  gameCode: string;
}

const SessionChoice = () => {
  const [nickname, setNickname] = useState<string>('');
  const [gameCode, setGameCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const newSessionButton = 'Create new session';
  const joinSessionButton = 'Join session';

  const onSubmit = async () => {
    const info: Payload = { nickname, gameCode };
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/game/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(info),
      });
      const { token, playerId, gameCode, errors } = await response.json();
      if (response.ok) {
        localStorage.setItem('token', token);
        localStorage.setItem('playerId', String(playerId));
        localStorage.setItem('gameCode', String(gameCode));

        await router.navigate(routes.lobbyPage);
        pushNotification('success', 'Joining server', 'Enjoy the game');
      } else {
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
            <Row justify='center'>
              <Col>
                <StyledImage src='/assets/logo.png' alt='logo' />
              </Col>
            </Row>
            <Row gutter={[0, 30]}>
              <Col span={24}>
                <Tags>Nickname</Tags>
                <StyledInput maxLength={12} onChange={(e) => setNickname(e.target.value)}></StyledInput>
              </Col>
              <Col span={24}>
                <Tags>
                  Game Code <OptionalText>(Optional)</OptionalText>
                </Tags>
                <StyledInput maxLength={6} onChange={(e) => setGameCode(e.target.value)}></StyledInput>
              </Col>
              <Col span={24}>
                <StyledButton loading={loading} onClick={onSubmit}>
                  {gameCode === '' ? newSessionButton : joinSessionButton}
                </StyledButton>
              </Col>
            </Row>
          </Col>
        </Row>
      </CenteredContainer>
    </Box>
  );
};

export default SessionChoice;
