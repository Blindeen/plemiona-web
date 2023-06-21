import { useContext } from 'react';

import { Col, Row } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined, CheckOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import GameSessionState from 'GameSessionContext';
import Modal from 'Components/Modal';
import { SectionHeader } from 'Components/SectionHeader/styles';
import { StyledLoadingBar } from 'Components/LoadingBar/styles';
import { Highlight, TextSection } from 'Containers/BattleLogModal/styles';
import palette from 'palette';

interface BattleLogModalProps {
  isBattleLogModalOpen: boolean;
  setIsBattleLogModalOpen: (value: boolean) => void;
}

const BattleLogModal = (props: BattleLogModalProps) => {
  const { gameState, setGameState } = useContext(GameSessionState);
  const { battleLog } = gameState;

  const getBattlePhaseIcon = (phase: string) => {
    switch (phase) {
      case 'O':
        return <ArrowRightOutlined />;
      case 'R':
        return <ArrowLeftOutlined />;
      case 'F':
        return <CheckOutlined />;
    }
  };

  const getBattlePhasePercent = (startTime: Date, returnTime: Date, battleTime: Date, phase: string) => {
    switch (phase) {
      case 'O':
        return Math.round(((dayjs().diff(dayjs(startTime))) / (dayjs(battleTime).diff(dayjs(startTime)))) * (2 / 3) * 100);
      case 'R':
        return 100 - Math.round(((dayjs(returnTime).diff(dayjs())) / (dayjs(returnTime).diff(dayjs(startTime)))) * 100);
      case 'F':
        return 100;
    }
  };

  const getBattlePhaseColor = (phase: string) => {
    switch (phase) {
      case 'O':
        return palette.red;
      case 'R':
        return palette.tundraSummerSkies;
      case 'F':
        return palette.lightGreen;
    }
  };

  const logs = battleLog.map((log, index) => (
    <Row key={index} gutter={[20, 0]}>
      <Col>
        <TextSection>{getBattlePhaseIcon(log.phase)}</TextSection>
      </Col>
      <Col span={8}>
        <StyledLoadingBar
          percent={getBattlePhasePercent(log.startTime, log.returnTime, log.battleTime, log.phase)}
          status='active'
          strokeColor={getBattlePhaseColor(log.phase)}
          showInfo={false}
        />
      </Col>
      <Col>
        <TextSection>
          <Highlight>{log.attacker.nickname}</Highlight> vs <Highlight>{log.defender.nickname}</Highlight>
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
