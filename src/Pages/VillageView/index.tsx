import { useContext } from 'react';

import { Col, Row } from 'antd';

import GameSessionContext from 'GameSessionContext';

import Village from 'Containers/Village';
import UnitsTable from 'Containers/UnitsTable';
import ResourcesTable from 'Containers/ResourcesTable';

import { Background } from 'Components/CommonComponents';
import { ResourcesRow, StyledCountdown, StyledDiv } from 'Pages/VillageView/styles';

const VillageView = () => {
  const { gameState } = useContext(GameSessionContext);

  return (
    <Background>
      <ResourcesRow gutter={[20, 0]} justify='center' align='middle'>
        <Col>
          <ResourcesTable />
        </Col>
        <Col>
          <StyledDiv>
            <StyledCountdown value={gameState.endedAt.valueOf()} format='mm:ss' />
          </StyledDiv>
        </Col>
        <Col>
          <UnitsTable />
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
