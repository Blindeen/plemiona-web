import Village from 'Containers/Village';
import { Col, Row } from 'antd';
import ResourcesTable from 'Containers/ResourcesTable';
import { Background, CenteredBox } from 'Components/CommonComponents';

const VillageView = () => (
  <Background>
    <CenteredBox>
      <Row gutter={[20, 20]}>
        <Col>
          <Village></Village>
        </Col>
        <Col>
          <ResourcesTable></ResourcesTable>
        </Col>
      </Row>
    </CenteredBox>
  </Background>
);

export default VillageView;
