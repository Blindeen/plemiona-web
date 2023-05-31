import { Container } from 'Containers/Village/styles';
import Building, { BuildingProps } from 'Components/Building';

const Village = () => {
  const Buildings: BuildingProps[] = [
    {
      name: 'Tartak',
      tier: 1,
      lvl: 1,
      posX: 550,
      posY: 480,
      sizeX: 200,
      sizeY: 200,
      posLvlX: 170,
      posLvlY: 20,
    },
    {
      name: 'Spichlerz',
      tier: 1,
      lvl: 1,
      posX: 280,
      posY: 200,
      sizeX: 200,
      sizeY: 200,
    },
    {
      name: 'Koszary',
      tier: 1,
      lvl: 1,
      posX: 10,
      posY: 400,
      sizeX: 200,
      sizeY: 200,
    },
    {
      name: 'Cegielnia',
      tier: 1,
      lvl: 1,
      posX: 50,
      posY: 150,
      sizeX: 200,
      sizeY: 200,
    },
    {
      name: 'Kuznia',
      tier: 1,
      lvl: 1,
      posX: 280,
      posY: 20,
      sizeX: 180,
      sizeY: 180,
    },
    {
      name: 'Ratusz',
      tier: 1,
      lvl: 1,
      posX: 500,
      posY: 50,
      sizeX: 250,
      sizeY: 250,
      posLvlX: 30,
      posLvlY: 40,
    },
    {
      name: 'Wall',
      tier: 1,
      lvl: 1,
      posX: 300,
      posY: 400,
      sizeX: 200,
      sizeY: 200,
      posLvlX: 30,
      posLvlY: 40,
    },
  ];

  const BuildingsJSX = Buildings.map(({ name, tier, lvl, posX, posY, sizeY, sizeX, posLvlX, posLvlY }, index) => (
    <Building
      key={index}
      tier={tier}
      name={name}
      lvl={lvl}
      posX={posX}
      posY={posY}
      sizeX={sizeX}
      sizeY={sizeY}
      posLvlX={posLvlX}
      posLvlY={posLvlY}
    />
  ));

  return <Container>{BuildingsJSX}</Container>;
};

export default Village;
