import { useContext } from 'react';
import { Col, Row, Tooltip } from 'antd';

import UnitComponent from 'Components/UnitComponent';

import GameSessionState, { UnitType } from 'GameSessionContext';
import { UnitsView } from './styles';
import { stringToTitle } from 'utils';

const UnitsTable = () => {
  const { gameState } = useContext(GameSessionState);

  return (
    <UnitsView>
      <Row>
        {Object.keys(gameState.units).map((unit, idx) => (
          <Col key={idx} span={6}>
            <Tooltip title={`${stringToTitle(unit)}`}>
              <>
                <UnitComponent name={unit} count={gameState.units[unit as UnitType].count} />
              </>
            </Tooltip>
          </Col>
        ))}
      </Row>
    </UnitsView>
  );
};

export default UnitsTable;

