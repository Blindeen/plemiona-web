import { useContext } from 'react';

import { Col, Row } from 'antd';

import { ResourcesView } from './styles';
import ResourcesComponent, { ResourcesProps } from 'Components/ResourcesComponent';
import GameSessionState from 'GameSessionContext';

const ResourcesTable = () => {
  const { gameState } = useContext(GameSessionState);

  const resourcesTable: ResourcesProps[] = [
    {
      name: 'iron',
      own: gameState.resources.iron,
      capacity: gameState.resourcesCapacity,
    },
    {
      name: 'clay',
      own: gameState.resources.clay,
      capacity: gameState.resourcesCapacity,
    },
    {
      name: 'wood',
      own: gameState.resources.wood,
      capacity: gameState.resourcesCapacity,
    },
  ];

  const resourcesComp = resourcesTable.map(({ name, own, capacity }, index) => (
    <Col>
      <ResourcesComponent key={index} name={name} capacity={capacity} own={own} />
    </Col>
  ));

  return (
    <ResourcesView>
      <Row gutter={[120, 0]} justify={'center'} style={{ marginRight: '10' }}>
        {resourcesComp}
      </Row>
    </ResourcesView>
  );
};

export default ResourcesTable;
