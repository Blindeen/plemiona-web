import { useContext, useState } from 'react';
import { Col, Divider, Row } from 'antd';

import { TimeTag, UpgradeButton } from 'Containers/UpgradeView/UpgradeContainer/styles';
import { ResourcesNameTag } from 'Containers/UpgradeView/styles';

import ResourcesComponent from 'Components/ResourcesComponent';
import Modal from 'Components/Modal';

import RecruitmentContainer, { RecruitmentContainerProps } from './RecruitmentContainer';
import { upgradeDurationSecondsLabel } from 'utils';
import GameSessionState from 'GameSessionContext';
import pushNotification from 'pushNotification';
import API_URL from 'api_url';

interface UpgradeViewProps {
  open: boolean;
  setOpen: (e: boolean) => void;
}

const UpgradeView = ({ open, setOpen }: UpgradeViewProps) => {
  const { gameState } = useContext(GameSessionState);

  const [loading, onLoading] = useState(false);

  const [inputArcher, setInputArcher] = useState(0);
  const [inputSwordsman, setInputSwordsman] = useState(0);
  const [inputAxeman, setInputAxeman] = useState(0);
  const [inputSpearman, setInputSpearman] = useState(0);

  const allRecruitCostWood =
    inputArcher * gameState.units.archer.trainingCost.wood +
    inputSwordsman * gameState.units.swordsman.trainingCost.wood +
    inputSpearman * gameState.units.spearman.trainingCost.wood +
    inputAxeman * gameState.units.axeman.trainingCost.wood;

  const allRecruitCostClay =
    inputArcher * gameState.units.archer.trainingCost.clay +
    inputSwordsman * gameState.units.swordsman.trainingCost.clay +
    inputSpearman * gameState.units.spearman.trainingCost.clay +
    inputAxeman * gameState.units.axeman.trainingCost.clay;

  const allRecruitCostIron =
    inputArcher * gameState.units.archer.trainingCost.iron +
    inputSwordsman * gameState.units.swordsman.trainingCost.iron +
    inputSpearman * gameState.units.spearman.trainingCost.iron +
    inputAxeman * gameState.units.axeman.trainingCost.iron;

  const allRecruitTime =
    inputArcher * gameState.units.archer.trainingDuration +
    inputSwordsman * gameState.units.swordsman.trainingDuration +
    inputSpearman * gameState.units.spearman.trainingDuration +
    inputAxeman * gameState.units.axeman.trainingDuration;

  const unitData: RecruitmentContainerProps[] = [
    {
      name: 'archer',
      unit: gameState.units.archer,
      input: inputArcher,
      setInput: setInputArcher,
    },
    {
      name: 'swordsman',
      unit: gameState.units.swordsman,
      input: inputSwordsman,
      setInput: setInputSwordsman,
    },
    {
      name: 'axeman',
      unit: gameState.units.axeman,
      input: inputAxeman,
      setInput: setInputAxeman,
    },
    {
      name: 'spearman',
      unit: gameState.units.spearman,
      input: inputSpearman,
      setInput: setInputSpearman,
    },
  ];

  const units = unitData.map((props, key) => <RecruitmentContainer key={key} {...props} />);

  const recruitUnits = async () => {
    onLoading(true);
    try {
      const response = await fetch(`${API_URL}/game/train_units/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token') as string,
        },
        body: JSON.stringify({
          units: [
            { name: 'archer', count: inputArcher },
            { name: 'axeman', count: inputAxeman },
            { name: 'spearman', count: inputSpearman },
            { name: 'swordsman', count: inputSwordsman },
          ],
        }),
      });
      if (response.ok) {
        pushNotification('success', `Starting recruiting`);
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

  return (
    <Modal
      open={open}
      closable={true}
      onCancel={() => setOpen(false)}
      width={1000}
      footer={false}
      keyboard={true}
      centered={true}
    >
      <Row>
        <Col span={22}>
          <Row gutter={[20, 0]}>
            <Col span={4}>
              <ResourcesNameTag>Unit</ResourcesNameTag>
            </Col>
            <Col span={12}>
              <ResourcesNameTag>Resources Cost</ResourcesNameTag>
            </Col>
            <Col span={5}>
              <ResourcesNameTag>Time</ResourcesNameTag>
            </Col>
            <Col span={2}>
              <ResourcesNameTag>Input</ResourcesNameTag>
            </Col>
            <Col span={1} />
          </Row>
          {units}
          <Divider />
          <Row gutter={[20, 0]}>
            <Col span={18} offset={2}>
              <ResourcesNameTag>Resources Cost</ResourcesNameTag>
            </Col>
            <Col span={2}>
              <ResourcesNameTag>Time</ResourcesNameTag>
            </Col>
          </Row>
          <Row align="middle" gutter={[20, 0]}>
            <Col span={2}>
              <ResourcesNameTag>Total :</ResourcesNameTag>
            </Col>
            <Col span={6}>
              <ResourcesComponent name="wood" own={allRecruitCostWood} />
            </Col>
            <Col span={6}>
              <ResourcesComponent name="clay" own={allRecruitCostClay} />
            </Col>
            <Col span={6}>
              <ResourcesComponent name="iron" own={allRecruitCostIron} />
            </Col>
            <Col span={2}>
              <TimeTag>{upgradeDurationSecondsLabel(allRecruitTime)}</TimeTag>
            </Col>
            <Col span={2}>
              <UpgradeButton
                disabled={
                  !(
                    allRecruitCostClay <= gameState.resources.clay &&
                    allRecruitCostWood <= gameState.resources.wood &&
                    allRecruitCostIron <= gameState.resources.iron &&
                    allRecruitTime > 0
                  )
                }
                loading={loading}
                onClick={recruitUnits}
              >
                Recruit
              </UpgradeButton>
            </Col>
          </Row>
        </Col>
      </Row>
    </Modal>
  );
};

export default UpgradeView;
