import { BuildingLvL, StyledBuilding } from './styles';

export interface BuildingProps {
  tier: number;
  name: string;
  lvl: number;
  posX: number;
  posY: number;
  sizeX: number;
  sizeY: number;
  posLvlX?: number;
  posLvlY?: number;
}

const Building = ({ tier, lvl, name, posX, posY, sizeX, sizeY, posLvlX, posLvlY }: BuildingProps) => {
  return (
    <StyledBuilding
      style={{
        top: posY,
        left: posX,
        width: sizeX,
        height: sizeY,
        backgroundImage: `url(/Assets/Buildings/${name}-Tier-${tier}-min.png)`,
      }}
    >
      <BuildingLvL style={{ top: posLvlY, left: posLvlX }}>{lvl}</BuildingLvL>
    </StyledBuilding>
  );
};

export default Building;
