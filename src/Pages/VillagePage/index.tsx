import { useContext, useState } from 'react';
import { Badge, Col, Row, Tooltip } from 'antd';

import BattleReportsModal from 'Containers/BattleReportsModal';
import BattleLogModal from 'Containers/BattleLogModal';
import ResourcesTable from 'Containers/ResourcesTable';
import UnitsTable from 'Containers/UnitsTable';
import HelpModal from 'Containers/HelpModal';
import Village from 'Containers/Village';

import { Background } from 'Components/CommonComponents';
import Button from 'Components/Button';

import { ResourcesRow, StyledCountdown, StyledDiv } from './styles';
import GameSessionContext from 'GameSessionContext';

const VillagePage = () => {
  const { gameState, setGameState } = useContext(GameSessionContext);
  const { isNewBattleLog } = gameState;

  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isBattleReportsModalOpen, setIsBattleReportsModalOpen] = useState(false);
  const [isBattleLogModalOpen, setIsBattleLogModalOpen] = useState(false);

  return (
    <Background>
      {isHelpModalOpen && <HelpModal isHelpModalOpen={isHelpModalOpen} setIsHelpModalOpen={setIsHelpModalOpen} />}
      {isBattleReportsModalOpen && (
        <BattleReportsModal
          isBattleReportsModalOpen={isBattleReportsModalOpen}
          setIsBattleReportsModalOpen={setIsBattleReportsModalOpen}
        />
      )}
      {isBattleLogModalOpen && (
        <BattleLogModal
          isBattleLogModalOpen={isBattleLogModalOpen}
          setIsBattleLogModalOpen={setIsBattleLogModalOpen}
        />
      )}
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <ResourcesRow gutter={[20, 20]} justify='center' align='middle'>
            <Col>
              <ResourcesTable />
            </Col>
            <Col>
              <StyledDiv>
                <StyledCountdown value={gameState.endedAt.valueOf()} format='mm:ss' />
              </StyledDiv>
            </Col>
            <Col>
              <UnitsTable />
            </Col>
          </ResourcesRow>
        </Col>
        <Col span={24}>
          <Row justify='center' gutter={[12, 12]}>
            <Col>
              <Village />
            </Col>
            <Col span={1}>
              <Row>
                <Col span={16}>
                  <Row gutter={[0, 8]}>
                    <Col span={24}>
                      <Tooltip title='Help'>
                        <Button onClick={() => setIsHelpModalOpen(true)}>?</Button>
                      </Tooltip>
                    </Col>
                    <Col span={24}>
                      <Tooltip title='Battle reports'>
                        <Button onClick={() => setIsBattleReportsModalOpen(true)}>R</Button>
                      </Tooltip>
                    </Col>
                    <Col span={24}>
                      <Tooltip title='Battle log'>
                        <Button
                          onClick={() => {
                            setIsBattleLogModalOpen(true);
                            setGameState({
                              ...gameState,
                              isNewBattleLog: false,
                            });
                          }}
                        >
                          L
                          <Badge dot={isNewBattleLog} offset={[-2, -10]}>
                          </Badge>
                        </Button>
                      </Tooltip>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Background>
  );
};

export default VillagePage;
