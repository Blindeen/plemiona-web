import { Button, Col, Row } from 'antd';

import ResourcesComponent from 'Components/ResourcesComponent';
import { Resources } from 'resourceContext';
import pushNotification from 'pushNotification';
import { useState } from 'react';

const UpgradeContainer = ({
  name = '',
  availableResources = {} as Resources,
  upgradeCost = {} as Resources,
  onLoadingChange = (input: boolean) => {},
  loading = false,
}) => {
  const [upgradeDuration, setUpgradeDuration] = useState('Upgrade');
  const [disable, setDisable] = useState(false);

  class Timer {
    constructor(public counter: number) {
      setDisable(true);
      let intervalId = setInterval(() => {
        this.counter = this.counter - 1;
        setUpgradeDuration(`${Math.floor(this.counter / 60)}:${this.counter % 60}`);
        if (this.counter === 0) {
          clearInterval(intervalId);
          setDisable(false);
          setUpgradeDuration('Upgrade');
        }
      }, 1000);
    }
  }

  const upgradeBuilding = async () => {
    onLoadingChange(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/game/building/${name}/upgrade/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token') as string,
        },
      });
      if (response.ok) {
        pushNotification('success', 'Starting game', 'Enjoy the game');
      } else {
        const { errors } = await response.json();
        Object.entries(errors).forEach(([key, value]) => {
          pushNotification('warning', `${key}: ${(value as string[]).join(' and ')}`);
        });
      }
    } catch (error) {
      pushNotification('error', 'Server down', 'Please check your connection');
    } finally {
      onLoadingChange(false);
      new Timer(90);
    }
  };

  return (
    <Row align={'middle'} justify={'center'} gutter={[20, 0]}>
      <Col span={4}>
        <div style={{ width: 'fit-content' }}>{name}</div>
      </Col>
      <Col span={6}>
        <ResourcesComponent
          width={48}
          height={48}
          capacity={upgradeCost.clay}
          name={'clay'}
          own={availableResources.clay}
        />
      </Col>
      <Col span={6}>
        <ResourcesComponent
          width={48}
          height={48}
          capacity={upgradeCost.iron}
          name={'iron'}
          own={availableResources.iron}
        />
      </Col>
      <Col span={6}>
        <ResourcesComponent
          width={48}
          height={48}
          capacity={upgradeCost.wood}
          name={'wood'}
          own={availableResources.wood}
        />
      </Col>
      <Col span={2}>
        <Button disabled={disable} loading={loading} onClick={upgradeBuilding}>
          {upgradeDuration}
        </Button>
      </Col>
    </Row>
  );
};

export default UpgradeContainer;
