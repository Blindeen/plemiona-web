import { Col, Row } from 'antd';
import React, { useState } from 'react';

import Button from 'Components/Button';
import Input from 'Components/Input';
import { Box, CenteredContainer, OptionalText, Tags } from './styles';

const SessionChoice = () => {
  const newSessionButton: React.ReactNode = <Button>Create new session</Button>;
  const joinSessionButton: React.ReactNode = <Button>Join session</Button>;

  const [userInput, setUserInput] = useState<string>('');

  return (
    <Box>
      <CenteredContainer>
        <Row gutter={[0, 48]}>
          <Col span={12} offset={6}>
            <Row gutter={[0, 30]}>
              <Col span={24}>
                <Tags>Nickname</Tags>
                <Input maxLength={12}></Input>
              </Col>
              <Col span={24}>
                <Tags>
                  Game Code <OptionalText>(Optional)</OptionalText>
                </Tags>
                <Input maxLength={6} onChange={(e) => setUserInput(e.target.value)}></Input>
              </Col>
              <Col span={24}>{userInput === '' ? newSessionButton : joinSessionButton}</Col>
            </Row>
          </Col>
        </Row>
      </CenteredContainer>
    </Box>
  );
};

export default SessionChoice;
