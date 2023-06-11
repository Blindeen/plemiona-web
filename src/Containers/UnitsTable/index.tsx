import { useContext } from 'react';

import { Col, Row } from 'antd';

import GameSessionState, { UnitType } from 'GameSessionContext';
import UnitComponent from 'Components/UnitComponent';
import { UnitsView } from './styles';

const ResourcesTable = () => {
  const { gameState } = useContext(GameSessionState);

  return (
    <UnitsView>
      <Row gutter={[40, 0]} justify={'center'} align={'middle'} style={{ marginRight: '10' }}>
        {Object.keys(gameState.units).map((unit, idx) => (
          <Col key={idx}>
            <UnitComponent name={unit} count={gameState.units[unit as UnitType].count} />
          </Col>
        ))}
      </Row>
    </UnitsView>
  );
};

export default ResourcesTable;
