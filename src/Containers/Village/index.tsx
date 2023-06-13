import { useContext, useEffect, useState } from 'react';
import { Tooltip } from 'antd';

import RecruitmentView from 'Containers/RecruitmentView';
import UpgradeView from 'Containers/UpgradeView';
import Building, { BuildingProps } from 'Components/Building';
import { Gate } from 'Components/Building/styles';

import GameSessionState from 'GameSessionContext';
import { router, routes } from 'router';
import { Container } from './styles';

const Village = () => {
  const { gameState } = useContext(GameSessionState);
  const [building, setBuilding] = useState(false);
  const [recruit, setRecruit] = useState(false);

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
      onClick: () => setRecruit(true),
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
      onClick: () => setBuilding(true),
    },
  ];

  const buildings = buildingsData.map((props, index) => <Building key={index} {...props} />);

  return (
    <>
      {recruit && <RecruitmentView open={recruit} setOpen={setRecruit} />}
      {building && <UpgradeView open={building} setOpen={setBuilding} />}
      <Container>
        {buildings}
        <Tooltip title="Go to the World Map">
          <Gate onClick={() => router.navigate('world')} x={300} y={450} width={200} height={200} />
        </Tooltip>
      </Container>
    </>
  );
};

export default Village;
