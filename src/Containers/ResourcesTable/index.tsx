import { useContext } from 'react';

import { Col, Row } from 'antd';

import { ResourcesView } from './styles';
import ResourcesComponent, { ResourcesProps } from 'Components/ResourcesComponent';
import GameSessionState from 'resourceContext';

const ResourcesTable = () => {
  const { gameState } = useContext(GameSessionState);

  const resourcesTable: ResourcesProps[] = [
    {
      name: 'iron',
      own: gameState.resources.iron,
      capacity: 100,
    },
    {
      name: 'clay',
      own: gameState.resources.clay,
      capacity: 100,
    },
    {
      name: 'wood',
      own: gameState.resources.wood,
      capacity: 100,
    },
  ];

  const resourcesComp = resourcesTable.map(({ name, own, capacity }, index) => (
    <Col>
      <ResourcesComponent key={index} name={name} capacity={capacity} own={own} />
    </Col>
  ));

  return (
    <ResourcesView>
      <Row gutter={[20, 20]}>{resourcesComp}</Row>
    </ResourcesView>
  );
};

export default ResourcesTable;
