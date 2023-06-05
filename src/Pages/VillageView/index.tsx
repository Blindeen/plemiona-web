import { Button, Col, Divider, Row } from 'antd';

import Village from 'Containers/Village';
import ResourcesTable from 'Containers/ResourcesTable';
import { Background, CenteredBox } from 'Components/CommonComponents';
import UpgradeView from 'Containers/UpgradeView';
import { useState } from 'react';
import { router } from 'router';

const VillageView = () => {
  const [modal, setModal] = useState(true);

  return (
    <>
      <Background>
        <CenteredBox>
          <Button onClick={() => setModal(true)}>Modal</Button>
          <Button onClick={() => router.navigate('test')}>test</Button>
          <UpgradeView open={modal} setOpen={setModal} />
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
