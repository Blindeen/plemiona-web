import { Fragment, useContext, useState } from 'react';

import { Col, Divider, Row } from 'antd';

import { TownHallWindow } from 'Containers/UpgradeView/styles';
import UpgradeContainer from 'Containers/UpgradeView/UpgradeContainer';
import GameSessionState, { Building } from 'GameSessionContext';

const UpgradeView = ({
                       open = true, setOpen = (e: boolean) => {
  },
                     }) => {
  const { gameState } = useContext(GameSessionState);
  const [loading, setLoading] = useState(false);

  const onLoadingChange = (input: boolean) => {
    setLoading(input);
  };

  const upgradeContainers = Array.from(Object.keys(gameState.buildings), name => ({
    name: name as Building,
    upgradeCost: gameState.buildings[name as Building].upgradeCost,
    availableResources: gameState.resources,
    onLoading: () => onLoadingChange,
    loading: loading,
  }));

  const upgrades = upgradeContainers.map(({ name, availableResources, upgradeCost, onLoading, loading }, idx) => (
    <Fragment key={idx}>
      <UpgradeContainer
        name={name}
        availableResources={availableResources}
        upgradeCost={upgradeCost}
        onLoading={onLoading}
        loading={loading}
      />
      <Divider />
    </Fragment>
  ));

  return (
    <TownHallWindow
      title={'UpgradeView'}
      open={open}
      closable={true}
      onCancel={() => setOpen(false)}
      width={650}
      keyboard={true}
    >
      <Row align={'middle'} gutter={[0, 0]} style={{ margin: 'auto' }}>
        <Col span={20}>{upgrades}</Col>
      </Row>
    </TownHallWindow>
  );
};

export default UpgradeView;
