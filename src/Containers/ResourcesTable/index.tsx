import { useContext } from 'react';

import { Col, Row } from 'antd';

import { ResourcesView } from './styles';
import ResourcesComponent, { ResourcesProps } from 'Components/ResourcesComponent';
import Resources from 'resourceContext';

const ResourcesTable = () => {
  const { resources } = useContext(Resources);

  const resourcesTable: ResourcesProps[] = [
    {
      name: 'iron',
      own: resources.iron,
      capacity: 100,
    },
    {
      name: 'clay',
      own: resources.iron,
      capacity: 100,
    },
    {
      name: 'wood',
      own: resources.iron,
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
