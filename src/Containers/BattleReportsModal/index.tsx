import { useEffect, useState } from 'react';
import { Col, Divider, Row, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import Modal from 'Components/Modal';

import { Count, Highlight, Report, SectionHeader, SectionText } from './styles';
import { playerType, Resources, UnitType } from 'GameSessionContext';
import pushNotification from 'pushNotification';
import API_URL from 'api_url';
import dayjs from 'dayjs';

interface BattleReportsModalProps {
  isBattleReportsModalOpen: boolean;
  setIsBattleReportsModalOpen: (value: boolean) => void;
}

type UnitsCount = Record<UnitType, number>;

interface BattleReport {
  id: number;
  attacker: playerType;
  defender: playerType;

  startTime: Date;
  battleTime: Date;
  returnTime: Date;

  attackerUnits: UnitsCount;
  defenderUnits: UnitsCount;

  leftAttackerUnits: UnitsCount;
  leftDefenderUnits: UnitsCount;

  plunderedResources: Resources;

  attackerLostMorale: number;
  defenderLostMorale: number;

  attackerStrenght: number;
  defenderStrenght: number;
}

const BattleReportsModal = (props: BattleReportsModalProps) => {
  const [loading, setLoading] = useState(false);
  const [battleReports, setBattleReports] = useState<BattleReport[]>([]);

  const fetchBattleReports = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/game/battles/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token') as string}`,
        },
      });
      const { results } = await response.json();
      if (response.ok) {
        setBattleReports(results);
      } else {
        pushNotification('error', 'Error', 'Cannot fetch battle reports');
      }
    } catch (error) {
      pushNotification('error', 'Server down', 'Please check your connection');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBattleReports();
  }, []);

  const displayPlayer = (
    player: playerType,
    units: UnitsCount,
    leftUnits: UnitsCount,
    strength: number,
    morale: number,
    description: string
  ) => (
    <>
      <Col span={24}>
        <Row>
          <Col span={4}>
            <SectionText>{description}:</SectionText>
          </Col>
          <Col span={20}>
            <SectionText>
              <Highlight>{player.nickname}</Highlight> ({player.village.x}|{player.village.y}) | Strength: {strength} |
              Lost morale: {morale}
            </SectionText>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row align="middle">
          <Col span={4}>
            <SectionText>Quantity:</SectionText>
          </Col>
          {Object.entries(units).map(([unit, count]) => (
            <Col span={5} key={unit}>
              <Count>
                <img src={`/assets/units-icons/${unit}.png`} alt={unit} width={32} height={32} /> {count}
              </Count>
            </Col>
          ))}
        </Row>
      </Col>
      <Col span={24}>
        <Row align="middle">
          <Col span={4}>
            <SectionText>Alive:</SectionText>
          </Col>
          {Object.entries(leftUnits).map(([unit, count]) => (
            <Col span={5} key={unit}>
              <Count>
                <img src={`/assets/units-icons/${unit}.png`} alt={unit} width={32} height={32} /> {count}
              </Count>
            </Col>
          ))}
        </Row>
      </Col>
    </>
  );

  return (
    <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} spinning={loading}>
      <Modal
        open={props.isBattleReportsModalOpen}
        onCancel={() => props.setIsBattleReportsModalOpen(false)}
        footer={null}
      >
        <Row>
          <Col span={23}>
            <SectionHeader>Battle Reports</SectionHeader>
            <Row>
              {battleReports.map(
                (
                  {
                    attacker,
                    attackerUnits,
                    leftAttackerUnits,
                    defender,
                    defenderUnits,
                    leftDefenderUnits,
                    attackerStrenght,
                    defenderStrenght,
                    attackerLostMorale,
                    defenderLostMorale,
                    battleTime,
                    plunderedResources,
                  },
                  idx
                ) => (
                  <Report span={24} key={idx}>
                    <Row>
                      <SectionText>
                        <Highlight>Battle time: {dayjs(battleTime).format('YYYY-MM-DD HH:mm:ss')}</Highlight>
                      </SectionText>
                      {displayPlayer(
                        attacker,
                        attackerUnits,
                        leftAttackerUnits,
                        attackerStrenght,
                        attackerLostMorale,
                        'Attacker'
                      )}
                      <Divider />
                      {displayPlayer(
                        defender,
                        defenderUnits,
                        leftDefenderUnits,
                        defenderStrenght,
                        defenderLostMorale,
                        'Defender'
                      )}
                      <Divider />
                      <Col span={24}>
                        <Row align="middle">
                          <Col span={6}>
                            <SectionText>Plundered resources:</SectionText>
                          </Col>
                          <Col span={6}>
                            <Count>
                              {plunderedResources.wood}
                              <img src="/assets/resources-icons/wood.png" alt="wood" width={48} height={48} />
                            </Count>
                          </Col>
                          <Col span={6}>
                            <Count>
                              {plunderedResources.clay}
                              <img src="/assets/resources-icons/clay.png" alt="clay" width={48} height={48} />
                            </Count>
                          </Col>
                          <Col span={6}>
                            <Count>
                              {plunderedResources.iron}
                              <img src="/assets/resources-icons/iron.png" alt="iron" width={48} height={48} />
                            </Count>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Report>
                )
              )}
            </Row>
          </Col>
        </Row>
      </Modal>
    </Spin>
  );
};

export default BattleReportsModal;
