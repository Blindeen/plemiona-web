import { useContext, useState } from 'react';
import { Col, Row, Statistic } from 'antd';
import UpgradeView from 'Containers/UpgradeView';
import Village from 'Containers/Village';

import { Background, CenteredBox } from 'Components/CommonComponents';

import GameSessionContext from 'GameSessionContext';
import ResourcesTable from 'Containers/ResourcesTable';
import { StyledDiv } from 'Pages/VillageView/styles';

const { Countdown } = Statistic;

const VillageView = () => {
  const { gameState } = useContext(GameSessionContext);
  const [modal, setModal] = useState(false);

  return (
    <>
      <Background>
        <CenteredBox>
          <UpgradeView open={modal} setOpen={setModal} />
          <Row gutter={[0, 20]}>
            <Col>
              <StyledDiv>
                <Countdown value={gameState.endedAt.valueOf()} format="mm:ss" />
              </StyledDiv>
            </Col>
            <Col span={24}>
              <Row gutter={[20, 20]} align="top" justify="center">
                <Col>
                  <Village />
                </Col>
                <Col>
                  <Row gutter={[0, 20]}>
                    <Col span={24}>
                      <ResourcesTable />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </CenteredBox>
      </Background>
    </>
  );
};

export default VillageView;
