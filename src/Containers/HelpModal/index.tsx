import { Col, Row } from 'antd';

import { Highlight, SectionHeader, SectionText } from 'Containers/HelpModal/styles';
import Modal from 'Components/Modal';

import GameSessionState, { UnitType } from 'GameSessionContext';
import { useContext } from 'react';
import { stringToTitle } from 'utils';

interface HelpModalProps {
  isHelpModalOpen: boolean;
  setIsHelpModalOpen: (value: boolean) => void;
}

const HelpModal = ({ isHelpModalOpen, setIsHelpModalOpen }: HelpModalProps) => {
  const { gameState } = useContext(GameSessionState);

  const getUnitDescription = (unitType: UnitType, description: string) => (
    <SectionText>
      <Highlight>{stringToTitle(unitType)}</Highlight> {description}
      <Row align="middle">
        <Col span={22} offset={1}>
          <SectionText>
            <Highlight>Strength:</Highlight> Offensive: {gameState.units[unitType].offensiveStrength} Defensive:{' '}
            {gameState.units[unitType].defensiveStrength}
          </SectionText>
        </Col>
        <Col span={22} offset={1}>
          <SectionText>
            <Highlight>Caring capacity:</Highlight> {gameState.units[unitType].carryingCapacity} resources
          </SectionText>
        </Col>
        <Col span={22} offset={1}>
          <SectionText>
            <Highlight>Speed:</Highlight> {gameState.units[unitType].speed} seconds per field
          </SectionText>
        </Col>
      </Row>
    </SectionText>
  );

  return (
    <Modal open={isHelpModalOpen} onCancel={() => setIsHelpModalOpen(false)} footer={null}>
      <Row>
        <Col span={24}>
          <SectionHeader>Help</SectionHeader>
          <SectionText>
            The game is about gathering resources, building village and training units. The goal is to have the most
            points at the end of the game. The points are calculated from the level of buildings.The game ends when the
            timer reaches 00:00. The game lasts 60 minutes.
          </SectionText>
        </Col>
        <Col span={24}>
          <SectionHeader>World</SectionHeader>
          <SectionText>
            By clicking on the gate, you can go to the world map. On the world map, you can see other players' villages.
          </SectionText>
        </Col>
        <Col span={24}>
          <SectionHeader>Resources</SectionHeader>
          <SectionText>
            There are 3 types of resources: wood, stone, and iron. They are needed for upgrading buildings and training
            units. Resources are gathered from resource buildings.
          </SectionText>
        </Col>
        <Col span={24}>
          <SectionHeader>Buildings</SectionHeader>
          <SectionText>
            <Highlight>Town Hall</Highlight> is the main building. You can upgrade other buildings from here. By
            upgrading the Town Hall, you can speed up the upgrading of other buildings.
          </SectionText>
          <SectionText>
            <Highlight>Sawmill / Clay Pit / Iron Mine</Highlight> are resource buildings. You can gather resources from
            them. The higher the level of the building, the more resources you can gather.
          </SectionText>
          <SectionText>
            <Highlight>Warehouse</Highlight> is a building that stores resources. The higher the level of the building,
            the more resources you can store.
          </SectionText>
          <SectionText>
            <Highlight>Barracks</Highlight> is a building that trains units.
          </SectionText>
        </Col>
        <Col span={24}>
          <SectionHeader>Units</SectionHeader>
          {getUnitDescription('spearman', 'is a cheap unit that is useful for plundering resources.')}
          {getUnitDescription('swordsman', 'is a balanced unit.')}
          {getUnitDescription('axeman', 'is a strong offensive unit but with low carrying capacity.')}
          {getUnitDescription('archer', 'is a strong defensive unit but it is costly.')}
        </Col>
      </Row>
    </Modal>
  );
};

export default HelpModal;
