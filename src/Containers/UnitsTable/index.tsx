import { useContext } from 'react';
import { Col, Row, Tooltip } from 'antd';

import UnitComponent from 'Components/UnitComponent';

import GameSessionState from 'GameSessionContext';
import { UnitsView } from './styles';
import { stringToTitle } from 'utils';

const UnitsTable = () => {
  const { gameState } = useContext(GameSessionState);

  return (
    <UnitsView>
      <Row>
        {Object.entries(gameState.units).map(([name, value], idx) => (
          <Col key={idx} span={6}>
            <Tooltip title={`${stringToTitle(name)}`}>
              <>
                <UnitComponent name={name} count={value.count} />
              </>
            </Tooltip>
          </Col>
        ))}
      </Row>
    </UnitsView>
  );
};

export default UnitsTable;

