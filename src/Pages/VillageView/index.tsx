import Village from 'Containers/Village';
import { Col, Divider, Row } from 'antd';
import ResourcesTable from 'Containers/ResourcesTable';
import { Background, CenteredBox } from 'Components/CommonComponents';

const VillageView = () => (
  <Background>
    <CenteredBox>
      <Row gutter={[20, 20]} align="middle" justify="center" style={{ marginLeft: 0, marginRight: 0 }}>
        <Col>
          <Village></Village>
        </Col>
        <Col>
          <ResourcesTable />
          <Divider />
          <ResourcesTable />
        </Col>
      </Row>
    </CenteredBox>
  </Background>
);

export default VillageView;
