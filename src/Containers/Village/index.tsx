import { useContext } from 'react';

import { Container } from 'Containers/Village/styles';
import Building, { BuildingProps } from 'Components/Building';
import Resources from 'resourceContext';

const Village = () => {
  const { resources } = useContext(Resources);

  const Buildings: BuildingProps[] = [
    {
      name: 'Tartak',
      lvl: resources.lumberjack,
      posX: 550,
      posY: 480,
      sizeX: 200,
      sizeY: 200,
      posLvlX: 170,
      posLvlY: 20,
    },
    {
      name: 'Spichlerz',
      lvl: resources.warehouse,
      posX: 280,
      posY: 200,
      sizeX: 200,
      sizeY: 200,
    },
    {
      name: 'Koszary',
      lvl: resources.barracks,
      posX: 10,
      posY: 400,
      sizeX: 200,
      sizeY: 200,
    },
    {
      name: 'Cegielnia',
      lvl: resources.clayPit,
      posX: 50,
      posY: 150,
      sizeX: 200,
      sizeY: 200,
    },
    {
      name: 'Kuznia',
      lvl: resources.stonePit,
      posX: 280,
      posY: 20,
      sizeX: 180,
      sizeY: 180,
    },
    {
      name: 'Ratusz',
      lvl: resources.townHall,
      posX: 500,
      posY: 50,
      sizeX: 250,
      sizeY: 250,
      posLvlX: 30,
      posLvlY: 40,
    },
    {
      name: 'Wall',
      lvl: 1,
      posX: 300,
      posY: 400,
      sizeX: 200,
      sizeY: 200,
      posLvlX: 30,
      posLvlY: 40,
    },
  ];

  const buildings = Buildings.map(({ name, lvl, posX, posY, sizeY, sizeX, posLvlX, posLvlY }, index) => (
    <Building
      key={index}
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

  return <Container>{buildings}</Container>;
};

export default Village;
