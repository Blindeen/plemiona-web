import { useState } from 'react';
import { Button, Col, Row } from 'antd';

import ResourcesComponent, { ResourcesProps } from 'Components/ResourcesComponent';

import { Resources } from 'GameSessionContext';
import pushNotification from 'pushNotification';

export interface UpgradeContainerProps {
  name: string;
  upgradeCost: Resources;
  availableResources: Resources;
  onLoading: (e: boolean) => {};
  loading: boolean;
}

const UpgradeContainer = ({ name, upgradeCost, availableResources, onLoading, loading }: UpgradeContainerProps) => {
  const [upgradeDuration, setUpgradeDuration] = useState('Upgrade');
  const [disable, setDisable] = useState(false);

  const upgradeBuilding = async () => {
    onLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/game/building/${name}/upgrade/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token') as string,
        },
      });
      if (response.ok) {
        pushNotification('success', `Starting building ${name}`, 'Enjoy the game');
      } else {
        const { errors } = await response.json();
        Object.entries(errors).forEach(([key, value]) => {
          pushNotification('warning', `${key}: ${(value as string[]).join(' and ')}`);
        });
      }
    } catch (error) {
      pushNotification('error', 'Server down', 'Please check your connection');
    } finally {
      onLoading(false);
    }
  };

  const resourcesForUpgrade: ResourcesProps[] = [
    {
      name: 'wood',
      width: 48,
      height: 48,
      capacity: upgradeCost.wood,
      own: availableResources.wood,
    },
    {
      name: 'clay',
      width: 48,
      height: 48,
      capacity: upgradeCost.clay,
      own: availableResources.clay,
    },
    {
      name: 'iron',
      width: 48,
      height: 48,
      capacity: upgradeCost.iron,
      own: availableResources.iron,
    },
  ];

  const resourcesContainer = resourcesForUpgrade.map(({ name, width, height, own, capacity }, index) => (
    <Col span={6}>
      <ResourcesComponent key={index} name={name} width={width} height={height} own={own} capacity={capacity} />
    </Col>
  ));

  return (
    <Row align={'middle'} justify={'center'} gutter={[20, 0]}>
      <Col span={4}>
        <div style={{ width: 'fit-content' }}>{name}</div>
      </Col>
      {resourcesContainer}
      <Col span={2}>
        <Button disabled={disable} loading={loading} onClick={upgradeBuilding}>
          {upgradeDuration}
        </Button>
      </Col>
    </Row>
  );
};

export default UpgradeContainer;
