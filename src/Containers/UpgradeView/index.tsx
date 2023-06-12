import { Fragment, useContext } from 'react';
import { Col, Divider, Row } from 'antd';

import { ResourcesNameTag, TownHallWindow } from './styles';
import UpgradeContainer from './UpgradeContainer';
import GameSessionState, { BuildingType } from 'GameSessionContext';

const UpgradeView = ({ open = true, setOpen = (e: boolean) => {} }) => {
  const { gameState } = useContext(GameSessionState);

  const upgradeContainers = Array.from(Object.keys(gameState.buildings), (name) => ({
    name: name as BuildingType,
    availableResources: gameState.resources,
    buildingContext: gameState.buildings[name as BuildingType],
  }));

  const upgrades = upgradeContainers.map(({ name, availableResources, buildingContext }, idx) => (
    <Fragment key={idx}>
      <UpgradeContainer name={name} availableResources={availableResources} buildingContext={buildingContext} />
      <Divider />
    </Fragment>
  ));

  return (
    <TownHallWindow
      open={open}
      closable={true}
      onCancel={() => setOpen(false)}
      width={650}
      keyboard={true}
      footer={false}
      centered={true}
    >
      <Row align={'middle'} gutter={[0, 0]} style={{ margin: 'auto' }}>
        <Col span={21}>
          <Row align={'middle'} justify={'center'} gutter={[20, 0]}>
            <Col span={4}>
              <ResourcesNameTag>Building</ResourcesNameTag>
            </Col>
            <Col span={15}>
              <ResourcesNameTag>Resources Cost</ResourcesNameTag>
            </Col>
            <Col span={3}>
              <ResourcesNameTag>Time</ResourcesNameTag>
            </Col>
            <Col span={2}></Col>
          </Row>
          <p />
          {upgrades}
        </Col>
      </Row>
    </TownHallWindow>
  );
};

export default UpgradeView;
