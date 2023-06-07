import { useContext, useState } from 'react';

import { Col, Divider, Row } from 'antd';

import { TownHallWindow } from 'Containers/UpgradeView/styles';
import UpgradeContainer, { UpgradeContainerProps } from 'Containers/UpgradeView/UpgradeContainer';
import GameSessionState from 'GameSessionContext';

const UpgradeView = ({ open = true, setOpen = (e: boolean) => {} }) => {
  const { gameState } = useContext(GameSessionState);
  const [loading, setLoading] = useState(false);

  const onLoadingChange = (input: boolean) => {
    setLoading(input);
  };

  const upgradeContainers: UpgradeContainerProps[] = [
    {
      name: 'barracks',
      upgradeCost: gameState.buildings.barracks.upgradeCost,
      availableResources: gameState.resources,
      onLoading: () => onLoadingChange,
      loading: loading,
    },
    {
      name: 'sawmill',
      upgradeCost: gameState.buildings.sawmill.upgradeCost,
      availableResources: gameState.resources,
      onLoading: () => onLoadingChange,
      loading: loading,
    },
    {
      name: 'warehouse',
      upgradeCost: gameState.buildings.warehouse.upgradeCost,
      availableResources: gameState.resources,
      onLoading: () => onLoadingChange,
      loading: loading,
    },
    {
      name: 'townHall',
      upgradeCost: gameState.buildings.townHall.upgradeCost,
      availableResources: gameState.resources,
      onLoading: () => onLoadingChange,
      loading: loading,
    },
    {
      name: 'clayPit',
      upgradeCost: gameState.buildings.clayPit.upgradeCost,
      availableResources: gameState.resources,
      onLoading: () => onLoadingChange,
      loading: loading,
    },
    {
      name: 'ironMine',
      upgradeCost: gameState.buildings.ironMine.upgradeCost,
      availableResources: gameState.resources,
      onLoading: () => onLoadingChange,
      loading: loading,
    },
  ];

  const upgrades = upgradeContainers.map(({ name, availableResources, upgradeCost, onLoading, loading }, index) => (
    <>
      <Divider />
      <UpgradeContainer
        key={index}
        name={name}
        availableResources={availableResources}
        upgradeCost={upgradeCost}
        onLoading={onLoading}
        loading={loading}
      />
    </>
  ));

  return (
    <TownHallWindow
      title={'UpgradeView'}
      open={open}
      closable={true}
      onCancel={() => setOpen(false)}
      width={650}
      keyboard={true}
      footer={false}
    >
      <Row align={'middle'} gutter={[0, 0]} style={{ margin: 'auto' }}>
        <Col span={20}>{upgrades}</Col>
      </Row>
    </TownHallWindow>
  );
};

export default UpgradeView;
