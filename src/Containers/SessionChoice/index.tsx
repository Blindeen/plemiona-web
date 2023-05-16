import React from 'react';
import { Box, OptionalText, Tags } from './styles';
import Button from 'Components/Button';
import { Col, Row } from 'antd';
import Input from 'Components/Input';

const SessionChoice = () => {
  return (
    <Box>
      <Row gutter={[0, 0]}>
        <Col span={24}>
          <Row gutter={[0, 50]}>
            <Col offset={6} span={12}>
              <Tags>Nickname</Tags>
              <Input></Input>
            </Col>
            <Col offset={6} span={12}>
              <Tags>
                Server Code <OptionalText>(Optional)</OptionalText>
              </Tags>
              <Input></Input>
            </Col>
            <Col span={12} offset={6}>
              <Button>Create new session</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Box>
  );
};

export default SessionChoice;
