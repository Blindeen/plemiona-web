import { Tooltip } from 'antd';

import { BuildingContainer, BuildingLvL, StyledBuilding } from './styles';

export interface BuildingProps {
  name: string;
  lvl: number;
  posX: number;
  posY: number;
  sizeX: number;
  sizeY: number;
  posLvlX?: number;
  posLvlY?: number;
  onClick?: () => void;
}

const Building = ({
  lvl = 1,
  name = 'Building',
  posX = 0,
  posY = 0,
  sizeX = 200,
  sizeY = 200,
  posLvlX = 0,
  posLvlY = 0,
  onClick = () => {},
}: BuildingProps) => {
  const tierPerLvl: number = 5;
  const lvlIndex: number = lvl - 1;
  const baseTier: number = 1;

  const tier = Math.floor(lvlIndex / tierPerLvl + baseTier);

  return (
    <BuildingContainer x={posX} y={posY} width={sizeX} height={sizeY}>
      <Tooltip title={name}>
        <StyledBuilding onClick={onClick} type={name} tier={tier}>
          <BuildingLvL x={posLvlX} y={posLvlY}>
            {lvl}
          </BuildingLvL>
        </StyledBuilding>
      </Tooltip>
    </BuildingContainer>
  );
};

export default Building;
