import { useContext } from 'react';

import { Col, Row } from 'antd';
import { ArrowLeftOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import GameSessionState from 'GameSessionContext';
import Modal from 'Components/Modal';
import { SectionHeader } from 'Components/SectionHeader/styles';
import { Highlight, TextSection } from 'Containers/BattleLogModal/styles';

interface BattleLogModalProps {
  isBattleLogModalOpen: boolean;
  setIsBattleLogModalOpen: (value: boolean) => void;
}

const BattleLogModal = (props: BattleLogModalProps) => {
  const { gameState, setGameState } = useContext(GameSessionState);
  const { battleLog } = gameState;

  const getBattlePhaseIcon = (battleTime: Date, returnTime: Date) => {
    if (returnTime) {
      if (dayjs().diff(returnTime) < 0) {
        return <ArrowLeftOutlined />;
      } else {
        return <CheckOutlined />;
      }
    } else {
      return <CloseOutlined />;
    }
  };

  const logs = battleLog.map((log, index) => (
    <Row key={index} gutter={[20, 0]} justify='center' align='middle'>
      <Col>
        <TextSection>{getBattlePhaseIcon(log.battleTime, log.returnTime)}</TextSection>
      </Col>
      <Col>
        <TextSection>{dayjs(log.startTime).format('HH:mm:ss')}</TextSection>
      </Col>
      <Col>
        <TextSection>
          <Highlight>{log.attacker.nickname} (Attacker)</Highlight> - <Highlight>{log.defender.nickname} (Defender)</Highlight>
        </TextSection>
      </Col>
    </Row>
  ));

  return (
    <Modal
      open={props.isBattleLogModalOpen}
      onCancel={() => {
        props.setIsBattleLogModalOpen(false);
        setGameState({
          ...gameState,
          isNewBattleLog: false,
        });
      }}
      footer={null}
    >
      <Row>
        <Col>
          <SectionHeader>Battle logs</SectionHeader>
        </Col>
      </Row>
      {logs}
    </Modal>
  );

};

export default BattleLogModal;
