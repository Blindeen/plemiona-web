import { ResourcesView } from './styles';
import { Col, Row } from 'antd';
import ResourcesComponent from 'Components/ResourcesComponent';

const ResourcesTable = () => {
  return (
    <ResourcesView>
      <Row gutter={[20, 20]}>
        <Col>
          <ResourcesComponent width={64} height={64} own={100} capacity={100} name="iron" />
        </Col>
        <Col>
          <ResourcesComponent width={64} height={64} own={100} capacity={100} name="clay" />
        </Col>
        <Col>
          <ResourcesComponent width={64} height={64} own={100} capacity={100} name="wood" />
        </Col>
      </Row>
    </ResourcesView>
  );
};

export default ResourcesTable;
