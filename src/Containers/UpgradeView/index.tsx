import { useContext, useState } from 'react';

import { Col, Divider, Row } from 'antd';

import { TownHallWindow } from 'Containers/UpgradeView/styles';
import UpgradeContainer from 'Containers/UpgradeView/UpgradeContainer';
import GameSessionState, { Resources } from 'resourceContext';

interface UpgradeContainerProps {
  name: String;
  upgradeCost: Resources;
  availableResources: Resources;
  onLoadingChange: (e: boolean) => {};
  loading: boolean;
}

const UpgradeView = ({ open = true, setOpen = (e: boolean) => {} }) => {
  const { gameState } = useContext(GameSessionState);
  const [loading, setLoading] = useState(false);

  const onLoadingChange = (input: boolean) => {
    setLoading(input);
  };

  // const upgradeContainers : UpgradeContainerProps[] {
  //   {
  //     name:'barracks';
  //     upgradeCost
  //   },
  // }

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
        <Col span={20}>
          <UpgradeContainer
            name={'barracks'}
            upgradeCost={gameState.buildings.barracks.upgradeCost}
            availableResources={gameState.resources}
            onLoadingChange={onLoadingChange}
            loading={loading}
          />
          <Divider />
          <UpgradeContainer
            name={gameState.buildings.barracks.name}
            upgradeCost={gameState.buildings.barracks.upgradeCost}
            availableResources={gameState.resources}
            onLoadingChange={onLoadingChange}
            loading={loading}
          />
          <Divider />
          <UpgradeContainer
            name={'barracks'}
            upgradeCost={gameState.buildings.barracks.upgradeCost}
            availableResources={gameState.resources}
            onLoadingChange={onLoadingChange}
            loading={loading}
          />
          <Divider />
          <UpgradeContainer
            name={gameState.buildings.barracks.name}
            upgradeCost={gameState.buildings.barracks.upgradeCost}
            availableResources={gameState.resources}
            onLoadingChange={onLoadingChange}
            loading={loading}
          />
          <Divider />
          <UpgradeContainer
            name={'barracks'}
            upgradeCost={gameState.buildings.barracks.upgradeCost}
            availableResources={gameState.resources}
            onLoadingChange={onLoadingChange}
            loading={loading}
          />
          <Divider />
          <UpgradeContainer
            name={gameState.buildings.barracks.name}
            upgradeCost={gameState.buildings.barracks.upgradeCost}
            availableResources={gameState.resources}
            onLoadingChange={onLoadingChange}
            loading={loading}
          />
        </Col>
      </Row>
    </TownHallWindow>
  );
};

export default UpgradeView;
