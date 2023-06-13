import { BuildingLvL, StyledBuilding } from './styles';
import { stringToFilename } from 'utils';

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
  onClick = () => null,
}: BuildingProps) => {
  const tierPerLvl: number = 5;
  const lvlIndex: number = lvl - 1;
  const baseTier: number = 1;

  const getTier = () => Math.floor(lvlIndex / tierPerLvl + baseTier);

  return (
    <StyledBuilding
      onClick={onClick}
      style={{
        top: posY,
        left: posX,
        width: sizeX,
        height: sizeY,
        backgroundImage: `url(/Assets/Buildings/${stringToFilename(name)}-tier-${getTier()}.png)`,
      }}
    >
      <BuildingLvL style={{ top: posLvlY, left: posLvlX }}>{lvl}</BuildingLvL>
    </StyledBuilding>
  );
};

export default Building;
