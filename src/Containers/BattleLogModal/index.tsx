import { useContext, useState } from 'react';
import { Col, Row } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined, CheckOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import { Highlight, TextSection } from 'Containers/BattleLogModal/styles';
import { SectionHeader } from 'Components/SectionHeader/styles';
import { StyledLoadingBar } from 'Components/LoadingBar/styles';

import GameSessionState from 'GameSessionContext';
import palette from 'palette';

const BattleLogModal = () => {
  const { gameState } = useContext(GameSessionState);
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
        return Math.round((dayjs().diff(dayjs(startTime)) / dayjs(battleTime).diff(dayjs(startTime))) * (2 / 3) * 100);
      case 'R':
        return 100 - Math.round((dayjs(returnTime).diff(dayjs()) / dayjs(returnTime).diff(dayjs(startTime))) * 100);
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

  const logs = battleLog.map((log, idx) => (
    <Col span={22} offset={1} key={idx}>
      <Row gutter={[20, 20]}>
        <Col>
          <TextSection>{getBattlePhaseIcon(log.phase)}</TextSection>
        </Col>
        <Col span={8}>
          <StyledLoadingBar
            percent={getBattlePhasePercent(log.startTime, log.returnTime, log.battleTime, log.phase)}
            status="active"
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
    </Col>
  ));

  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 20,
        left: 20,
        height: isCollapsed ? 60 : 300,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        borderRadius: 8,
        transition: 'all 0.3s ease',
        overflow: 'hidden',
        zIndex: 9999,
        width: isCollapsed ? 225 : 600,
        backgroundColor: palette.dadsRayOfSunshine,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px',
          cursor: 'pointer',
          height: 60,
        }}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <SectionHeader>Battle logs</SectionHeader>
        {isCollapsed ? <UpOutlined style={{ fontSize: 24 }} /> : <DownOutlined style={{ fontSize: 24 }} />}
      </div>
      {isCollapsed ? null : (
        <Row gutter={[20, 0]}>
          {logs.length === 0 ? (
            <Col span={22} offset={1}>
              <TextSection>No battle logs</TextSection>
            </Col>
          ) : (
            logs
          )}
        </Row>
      )}
    </div>
  );
};

export default BattleLogModal;
