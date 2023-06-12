import { Fragment, useContext, useState } from 'react';
import { Col, Row } from 'antd';

import ResourcesComponent, { ResourcesProps } from 'Components/ResourcesComponent';

import GameSessionState, { BuildingInterface, BuildingType, Resources } from 'GameSessionContext';
import pushNotification from 'pushNotification';
import { MaxLvlTag, NameTag, TimeTag, UpgradeButton } from './styles';
import { camelToSnakeCase, msToUpgradeLabel, nameToDisplayName, upgradeDurationSecondsLabel } from 'utils';

export interface UpgradeContainerProps {
  name: BuildingType;
  buildingContext: BuildingInterface;
  availableResources: Resources;
}

const UpgradeContainer = ({ name, buildingContext, availableResources }: UpgradeContainerProps) => {
  const { gameState } = useContext(GameSessionState);
  const [loading, onLoading] = useState(false);

  const displayName = nameToDisplayName(name);

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
        pushNotification('success', `Starting building : ${displayName}`);

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
      capacity: buildingContext.upgradeCost.wood,
      own: availableResources.wood,
    },
    {
      name: 'clay',
      width: 48,
      height: 48,
      capacity: buildingContext.upgradeCost.clay,
      own: availableResources.clay,
    },
    {
      name: 'iron',
      width: 48,
      height: 48,
      capacity: buildingContext.upgradeCost.iron,
      own: availableResources.iron,
    },
  ];

  const resourcesContainer = resourcesForUpgrade.map(({ name, width, height, own, capacity }, idx) => (
    <Col key={idx} span={5}>
      <ResourcesComponent name={name} width={width as number} height={height as number} own={own} capacity={capacity} />
    </Col>
  ));

  return (
    <Row align={'middle'} justify={'center'} gutter={[20, 0]}>
      <Col span={4}>
        <NameTag>{displayName}</NameTag>
        <NameTag>Level: {buildingContext.level}</NameTag>
      </Col>
      {buildingContext.level !== buildingContext.maxLevel ? (
        <Fragment>
          {resourcesContainer}
          <Col span={3}>
            <TimeTag>{upgradeDurationSecondsLabel(buildingContext.upgradeDuration)}</TimeTag>
          </Col>
          <Col span={2}>
            <UpgradeButton
              disabled={
                buildingContext.upgradeCost.iron > availableResources.iron ||
                buildingContext.upgradeCost.wood > availableResources.wood ||
                buildingContext.upgradeCost.clay > availableResources.clay ||
                upgradeTime > 0
              }
              loading={loading}
              onClick={upgradeBuilding}
            >
              {msToUpgradeLabel(upgradeTime)}
            </UpgradeButton>
          </Col>
        </Fragment>
      ) : (
        <Fragment>
          <Col span={20}>
            <MaxLvlTag>Max level reached</MaxLvlTag>
          </Col>
        </Fragment>
      )}
    </Row>
  );
};

export default UpgradeContainer;
