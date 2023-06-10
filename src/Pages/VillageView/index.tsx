import { Button, Col, Divider, Row } from 'antd';

import { router } from 'router';

import Village from 'Containers/Village';
import ResourcesTable from 'Containers/ResourcesTable';
import { Background, CenteredBox } from 'Components/CommonComponents';

const VillageView = () => {
  return (
    <>
      <Background>
        <CenteredBox>
          <Button onClick={() => router.navigate('test')}>test</Button>
          <Row gutter={[20, 20]} align="middle" justify="center" style={{ marginLeft: 0, marginRight: 0 }}>
            <Col>
              <Village />
            </Col>
            <Col>
              <ResourcesTable />
              <Divider />
              <ResourcesTable />
            </Col>
          </Row>
        </CenteredBox>
      </Background>
    </>
  );
};

export default VillageView;
