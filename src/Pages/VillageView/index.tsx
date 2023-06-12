import { useContext, useState } from 'react';
import { Col, Row } from 'antd';
import UpgradeView from 'Containers/UpgradeView';
import Village from 'Containers/Village';

import { Background } from 'Components/CommonComponents';

import GameSessionContext from 'GameSessionContext';
import ResourcesTable from 'Containers/ResourcesTable';
import { ResourcesRow, StyledCountdown, StyledDiv } from 'Pages/VillageView/styles';

const VillageView = () => {
  const { gameState } = useContext(GameSessionContext);
  const [modal, setModal] = useState(false);

  return (
    <Background>
      <UpgradeView open={modal} setOpen={setModal} />
      <ResourcesRow gutter={[20, 20]} justify='center' align='middle'>
        <Col>
          <ResourcesTable />
        </Col>
        <Col>
          <StyledDiv>
            <StyledCountdown value={gameState.endedAt.valueOf()} format='mm:ss' />
          </StyledDiv>
        </Col>
        <Col>
          <ResourcesTable />
        </Col>
      </ResourcesRow>
      <Row justify='center'>
        <Col>
          <Village />
        </Col>
      </Row>
    </Background>
  );
};

export default VillageView;
