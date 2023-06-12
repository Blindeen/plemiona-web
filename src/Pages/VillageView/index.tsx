import { Col, Divider, Row } from 'antd';

import Village from 'Containers/Village';
import ResourcesTable from 'Containers/ResourcesTable';
import { Background, CenteredBox } from 'Components/CommonComponents';
import UnitsTable from 'Containers/UnitsTable';

const VillageView = () => {
  return (
    <>
      <Background>
        <CenteredBox>
          <Row gutter={[20, 20]} align="middle" justify="center" style={{ marginLeft: 0, marginRight: 0 }}>
            <Col>
              <Village />
            </Col>
            <Col>
              <ResourcesTable />
              <Divider />
              <UnitsTable />
            </Col>
          </Row>
        </CenteredBox>
      </Background>
    </>
  );
};

export default VillageView;
