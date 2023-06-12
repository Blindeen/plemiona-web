import { useContext } from 'react';

import { Col, Row } from 'antd';

import { ResourcesView } from './styles';
import ResourcesComponent from 'Components/ResourcesComponent';
import GameSessionState, { Resource } from 'GameSessionContext';

const ResourcesTable = () => {
  const { gameState } = useContext(GameSessionState);

  return (
    <ResourcesView>
      <Row gutter={[70, 0]} justify='center' align='middle' style={{ marginRight: '10' }}>
        {Object.keys(gameState.resources).map((resource, idx) => (
          <Col key={idx}>
            <ResourcesComponent
              name={resource}
              capacity={gameState.resourcesCapacity}
              own={gameState.resources[resource as Resource]}
              income={gameState.resourcesIncome[resource as Resource]}
            />
          </Col>
        ))}
      </Row>
    </ResourcesView>
  );
};

export default ResourcesTable;
