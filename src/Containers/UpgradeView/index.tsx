import { Fragment, useContext, useState } from 'react';

import { Col, Divider, Row } from 'antd';

import { ResourcesNameTag, TownHallWindow } from 'Containers/UpgradeView/styles';
import UpgradeContainer from 'Containers/UpgradeView/UpgradeContainer';
import GameSessionState, { Building } from 'GameSessionContext';

const UpgradeView = ({ open = true, setOpen = (e: boolean) => {} }) => {
  const { gameState } = useContext(GameSessionState);
  const [loading, setLoading] = useState(false);

  const onLoadingChange = (input: boolean) => {
    setLoading(input);
  };

  const upgradeContainers = Array.from(Object.keys(gameState.buildings), (name) => ({
    name: name as Building,
    availableResources: gameState.resources,
    buildingContext: gameState.buildings[name as Building],
    onLoading: () => onLoadingChange,
    loading: loading,
  }));

  const upgrades = upgradeContainers.map(({ name, availableResources, buildingContext, onLoading, loading }, idx) => (
    <Fragment key={idx}>
      <UpgradeContainer
        name={name}
        availableResources={availableResources}
        buildingContext={buildingContext}
        onLoading={onLoading}
        loading={loading}
      />
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
