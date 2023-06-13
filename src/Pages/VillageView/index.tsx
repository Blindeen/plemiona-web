import { useContext, useState } from 'react';
import { Col, Row, Tooltip } from 'antd';

import Village from 'Containers/Village';
import UnitsTable from 'Containers/UnitsTable';
import ResourcesTable from 'Containers/ResourcesTable';

import { Background } from 'Components/CommonComponents';
import Button from 'Components/Button';
import Modal from 'Components/Modal';

import { ResourcesRow, StyledCountdown, StyledDiv } from './styles';
import GameSessionContext from 'GameSessionContext';

const VillageView = () => {
  const { gameState } = useContext(GameSessionContext);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  const helpModal = (
    <Modal title="Help" open={isHelpModalOpen} onCancel={() => setIsHelpModalOpen(false)} footer={null}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );

  return (
    <Background>
      {helpModal}
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <ResourcesRow gutter={[20, 20]} justify="center" align="middle">
            <Col>
              <ResourcesTable />
            </Col>
            <Col>
              <StyledDiv>
                <StyledCountdown value={gameState.endedAt.valueOf()} format="mm:ss" />
              </StyledDiv>
            </Col>
            <Col>
              <UnitsTable />
            </Col>
          </ResourcesRow>
        </Col>
        <Col span={24}>
          <Row justify="center" gutter={[12, 12]}>
            <Col>
              <Village />
            </Col>
            <Col>
              <Row>
                <Col>
                  <Tooltip title="Help">
                    <Button onClick={() => setIsHelpModalOpen(true)}>?</Button>
                  </Tooltip>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Background>
  );
};

export default VillageView;
