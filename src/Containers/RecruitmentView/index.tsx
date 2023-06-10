import { Col, Divider, Input, Row } from 'antd';
import { ResourcesNameTag, TownHallWindow } from 'Containers/UpgradeView/styles';
import { useContext, useState } from 'react';
import GameSessionState from 'GameSessionContext';
import { NameTag } from 'Containers/UpgradeView/UpgradeContainer/styles';
import ResourcesComponent from 'Components/ResourcesComponent';
import Button from 'Components/Button';

const UpgradeView = ({ open = true, setOpen = (e: boolean) => {} }) => {
  const { gameState } = useContext(GameSessionState);

  const [inputArcher, setInputArcher] = useState('0');
  const [inputSwordsman, setInputSwordsman] = useState('0');
  const [inputAxeman, setInputAxeman] = useState('0');
  const [inputSpearman, setInputSpearman] = useState('0');

  var allUpgradeCostWood =
    +inputArcher * gameState.units.archer.trainingCost.wood +
    +inputSwordsman * gameState.units.swordsman.trainingCost.wood +
    +inputSpearman * gameState.units.spearman.trainingCost.wood +
    +inputAxeman * gameState.units.axeman.trainingCost.wood;

  var allUpgradeCostClay =
    +inputArcher * gameState.units.archer.trainingCost.clay +
    +inputSwordsman * gameState.units.swordsman.trainingCost.clay +
    +inputSpearman * gameState.units.spearman.trainingCost.clay +
    +inputAxeman * gameState.units.axeman.trainingCost.clay;

  var allUpgradeCostIron =
    +inputArcher * gameState.units.archer.trainingCost.iron +
    +inputSwordsman * gameState.units.swordsman.trainingCost.iron +
    +inputSpearman * gameState.units.spearman.trainingCost.iron +
    +inputAxeman * gameState.units.axeman.trainingCost.iron;

  var allUpgradeTime =
    +inputArcher * gameState.units.archer.trainingDuration +
    +inputSwordsman * gameState.units.swordsman.trainingDuration +
    +inputSpearman * gameState.units.spearman.trainingDuration +
    +inputAxeman * gameState.units.axeman.trainingDuration;

  return (
    <TownHallWindow
      open={open}
      closable={true}
      onCancel={() => setOpen(false)}
      width={1000}
      footer={false}
      keyboard={true}
      centered={true}
    >
      <Row align={'middle'} gutter={[0, 0]} style={{ margin: 'auto' }}>
        <Col span={22}>
          <Row align={'middle'} justify={'center'} gutter={[20, 0]}>
            <Col span={4}>
              <ResourcesNameTag>Unit</ResourcesNameTag>
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
          <Row align={'middle'} justify={'center'} gutter={[10, 0]}>
            <Col span={4}>
              <NameTag>Swordsman</NameTag>
              <NameTag>Count : {gameState.units.archer.count}</NameTag>
            </Col>
            <Col span={4}>
              <ResourcesComponent name={'wood'} own={gameState.units.swordsman.trainingCost.wood} />
            </Col>
            <Col span={4}>
              <ResourcesComponent name={'clay'} own={gameState.units.swordsman.trainingCost.clay} />
            </Col>
            <Col span={4}>
              <ResourcesComponent name={'iron'} own={gameState.units.swordsman.trainingCost.iron} />
            </Col>
            <Col span={3}></Col>
            <Col span={2}>
              <Input maxLength={2} type="number" onChange={(e) => setInputSwordsman(e.target.value)}></Input>
            </Col>
            <Col span={3}></Col>
          </Row>
          <Row align={'middle'} justify={'center'} gutter={[10, 0]}>
            <Col span={4}>
              <NameTag>Spearman</NameTag>
              <NameTag>Count : {gameState.units.spearman.count}</NameTag>
            </Col>
            <Col span={4}>
              <ResourcesComponent name={'wood'} own={gameState.units.spearman.trainingCost.wood} />
            </Col>
            <Col span={4}>
              <ResourcesComponent name={'clay'} own={gameState.units.spearman.trainingCost.clay} />
            </Col>
            <Col span={4}>
              <ResourcesComponent name={'iron'} own={gameState.units.spearman.trainingCost.iron} />
            </Col>
            <Col span={3}></Col>
            <Col span={2}>
              <Input maxLength={2} onChange={(e) => setInputSpearman(e.target.value)}></Input>
            </Col>
            <Col span={3}></Col>
          </Row>
          <Row align={'middle'} justify={'center'} gutter={[10, 0]}>
            <Col span={4}>
              <NameTag>Axeman</NameTag>
              <NameTag>Count : {gameState.units.axeman.count}</NameTag>
            </Col>
            <Col span={4}>
              <ResourcesComponent name={'wood'} own={gameState.units.axeman.trainingCost.wood} />
            </Col>
            <Col span={4}>
              <ResourcesComponent name={'clay'} own={gameState.units.axeman.trainingCost.clay} />
            </Col>
            <Col span={4}>
              <ResourcesComponent name={'iron'} own={gameState.units.axeman.trainingCost.iron} />
            </Col>
            <Col span={3}></Col>
            <Col span={2}>
              <Input maxLength={2} onChange={(e) => setInputAxeman(e.target.value)}></Input>
            </Col>
            <Col span={3}></Col>
          </Row>
          <Row align={'middle'} justify={'center'} gutter={[10, 0]}>
            <Col span={4}>
              <NameTag>Archer</NameTag>
              <NameTag>Count : {gameState.units.archer.count}</NameTag>
            </Col>
            <Col span={4}>
              <ResourcesComponent name={'wood'} own={gameState.units.archer.trainingCost.wood} />
            </Col>
            <Col span={4}>
              <ResourcesComponent name={'clay'} own={gameState.units.archer.trainingCost.clay} />
            </Col>
            <Col span={4}>
              <ResourcesComponent name={'iron'} own={gameState.units.archer.trainingCost.iron} />
            </Col>
            <Col span={3}></Col>
            <Col span={2}>
              <Input maxLength={2} onChange={(e) => setInputArcher(e.target.value)}></Input>
            </Col>
            <Col span={3}></Col>
          </Row>
          <Divider />
          <Row align={'middle'} justify={'center'} gutter={[20, 0]}>
            <Col span={15} offset={4}>
              <ResourcesNameTag>Resources Cost</ResourcesNameTag>
            </Col>
            <Col span={3}>
              <ResourcesNameTag>Time</ResourcesNameTag>
            </Col>
            <Col span={2}></Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row align={'middle'} justify={'center'} gutter={[20, 0]}>
            <Col span={2}>
              <ResourcesNameTag>Total :</ResourcesNameTag>
            </Col>
            <Col span={6}>
              <ResourcesComponent name={'wood'} own={allUpgradeCostWood} capacity={gameState.resources.wood} />
            </Col>
            <Col span={6}>
              <ResourcesComponent name={'clay'} own={allUpgradeCostClay} capacity={gameState.resources.clay} />
            </Col>
            <Col span={6}>
              <ResourcesComponent name={'iron'} own={allUpgradeCostIron} capacity={gameState.resources.iron} />
            </Col>
            <Col span={4}></Col>
          </Row>
          <Row align={'middle'} justify={'center'} gutter={[20, 0]}>
            <Col span={2}>
              <ResourcesNameTag>Total :</ResourcesNameTag>
            </Col>
            <Col span={6}>
              <ResourcesComponent name={'wood'} own={allUpgradeCostWood} capacity={gameState.resources.wood} />
            </Col>
            <Col span={6}>
              <ResourcesComponent name={'clay'} own={allUpgradeCostClay} capacity={gameState.resources.clay} />
            </Col>
            <Col span={6}>
              <ResourcesComponent name={'iron'} own={allUpgradeCostIron} capacity={gameState.resources.iron} />
            </Col>
            <Col span={4}></Col>
          </Row>
        </Col>
        <Col offset={22} span={2}>
          <Row>
            <Button>Recruit</Button>
          </Row>
        </Col>
      </Row>
    </TownHallWindow>
  );
};

export default UpgradeView;
