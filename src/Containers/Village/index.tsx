import { useContext, useEffect } from 'react';

import { Container } from 'Containers/Village/styles';
import Building, { BuildingProps } from 'Components/Building';

import GameSessionState from 'GameSessionContext';
import { router, routes } from 'router';

const Village = () => {
  const { gameState } = useContext(GameSessionState);

  useEffect(() => {
    if (gameState.hasGameEnded) {
      router.navigate(routes.leaderboardPage);
    }
  }, [gameState.hasGameEnded]);

  const buildingsData: BuildingProps[] = [
    {
      name: 'Tartak',
      lvl: gameState.buildings.sawmill.level,
      posX: 550,
      posY: 480,
      sizeX: 200,
      sizeY: 200,
      posLvlX: 170,
      posLvlY: 20,
    },
    {
      name: 'Spichlerz',
      lvl: gameState.buildings.warehouse.level,
      posX: 280,
      posY: 200,
      sizeX: 200,
      sizeY: 200,
    },
    {
      name: 'Koszary',
      lvl: gameState.buildings.barracks.level,
      posX: 10,
      posY: 400,
      sizeX: 200,
      sizeY: 200,
    },
    {
      name: 'Cegielnia',
      lvl: gameState.buildings.clayPit.level,
      posX: 50,
      posY: 150,
      sizeX: 200,
      sizeY: 200,
    },
    {
      name: 'Kuznia',
      lvl: gameState.buildings.ironMine.level,
      posX: 280,
      posY: 20,
      sizeX: 180,
      sizeY: 180,
    },
    {
      name: 'Ratusz',
      lvl: gameState.buildings.townHall.level,
      posX: 500,
      posY: 50,
      sizeX: 250,
      sizeY: 250,
      posLvlX: 30,
      posLvlY: 40,
    },
  ];

  const buildings = buildingsData.map(({ name, lvl, posX, posY, sizeY, sizeX, posLvlX, posLvlY }, index) => (
    <Building
      key={index}
      name={name}
      lvl={lvl}
      posX={posX}
      posY={posY}
      sizeX={sizeX}
      sizeY={sizeY}
      posLvlX={posLvlX as number}
      posLvlY={posLvlY as number}
    />
  ));

  return (
    <>
      <Container>{buildings}</Container>
    </>
  );
};

export default Village;
