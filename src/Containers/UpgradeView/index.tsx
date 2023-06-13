import { Fragment, useContext } from 'react';
import { Col, Divider, Row } from 'antd';

import Modal from 'Components/Modal';

import GameSessionState, { BuildingType } from 'GameSessionContext';
import UpgradeContainer from './UpgradeContainer';
import { ResourcesNameTag } from './styles';

interface UpgradeViewProps {
  open: boolean;
  setOpen: (e: boolean) => void;
}

const UpgradeView = ({ open, setOpen }: UpgradeViewProps) => {
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
    <Modal
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
    </Modal>
  );
};

export default UpgradeView;
