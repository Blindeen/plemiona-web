import { useContext } from 'react';
import { Button, Col, Row } from 'antd';

import ResourcesComponent, { ResourcesProps } from 'Components/ResourcesComponent';

import GameSessionState, { Building, Resources } from 'GameSessionContext';
import pushNotification from 'pushNotification';

export interface UpgradeContainerProps {
  name: Building;
  upgradeCost: Resources;
  availableResources: Resources;
  onLoading: (e: boolean) => {};
  loading: boolean;
}

const camelToSnakeCase = (str: string) => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

const padTo2Digits = (num: number) => num.toString().padStart(2, '0');

const msToUpgradeLabel = (milliseconds: number) => {
  if (milliseconds <= 0) return 'Upgrade';

  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);

  seconds = seconds % 60;

  return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
};

const UpgradeContainer = ({ name, upgradeCost, availableResources, onLoading, loading }: UpgradeContainerProps) => {
  const { gameState } = useContext(GameSessionState);

  const upgradeDate = localStorage.getItem(`${name}_upgrade`);
  const upgradeTime = upgradeDate ? new Date(upgradeDate as string).getTime() - new Date().getTime() : 0;

  const upgradeBuilding = async () => {
    onLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/game/building/${camelToSnakeCase(name)}/upgrade/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token') as string,
        },
      });
      if (response.ok) {
        pushNotification('success', `Starting building ${name}`, 'Enjoy the game');

        const requestTime = new Date();
        requestTime.setSeconds(new Date().getSeconds() + gameState.buildings[name].upgradeDuration);
        localStorage.setItem(`${name}_upgrade`, requestTime.toString());
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

  const resourcesContainer = resourcesForUpgrade.map(({ name, width, height, own, capacity }, idx) => (
    <Col key={idx} span={6}>
      <ResourcesComponent name={name} width={width as number} height={height as number} own={own} capacity={capacity} />
    </Col>
  ));

  return (
    <Row align={'middle'} justify={'center'} gutter={[20, 0]}>
      <Col span={4}>
        <div style={{ width: 'fit-content' }}>{name}</div>
      </Col>
      {resourcesContainer}
      <Col span={2}>
        <Button disabled={upgradeTime > 0} loading={loading} onClick={upgradeBuilding}>
          {msToUpgradeLabel(upgradeTime)}
        </Button>
      </Col>
    </Row>
  );
};

export default UpgradeContainer;
