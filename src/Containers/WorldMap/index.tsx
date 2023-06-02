import { useRef, useState } from 'react';

import { MapBackground, MapImage, MapSquare } from 'Containers/WorldMap/styles';
import { playerType } from 'resourceContext';

export type mapTile = {
  type: 'player' | 'empty' | 'barbarians'
  player?: playerType
  army?: null // for now
  isTarget: boolean
}

const WorldMap = () => {
  const FRAGMENT_SIZE = 7;

  let BEMap = [...Array.from({ length: 16 }, () =>
    [...Array.from({ length: 16 }, () =>
      ({ type: 'empty', army: null, isTarget: false }),
    )],
  )] as mapTile[][];

  BEMap[4][4] = { type: 'player', army: null, isTarget: false, player: { nickname: 'Adam', id: 5 } };

  const [{ x: cordX, y: cordY }, setCords] = useState({ x: 3, y: 3 });
  const [{ x: positionX, y: positionY }, setCurrentPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  const mapFragment = (map = BEMap.slice(cordY, cordY + FRAGMENT_SIZE), idx = 0): mapTile[] =>
    map[idx] ? [
      ...map[idx].slice(cordX, cordX + FRAGMENT_SIZE),
      ...mapFragment(map, idx + 1),
    ] : [];

  const calculateAbsolute = (relativeIdx: number) => [relativeIdx % FRAGMENT_SIZE + cordX, Math.floor(relativeIdx / FRAGMENT_SIZE) + cordY];

  const handleCLick = (relativeIdx: number) => {
    const [absoluteX, absoluteY] = calculateAbsolute(relativeIdx);
    console.log(`${absoluteX} ${absoluteY}`);
    //request with cords
  };

  const handleNavigation = (direction: 'right' | 'left' | 'up' | 'down') => {
    const containerElement = containerRef.current;
    if (!containerElement) return;

    const containerWidth = containerElement.offsetWidth;
    const containerHeight = containerElement.offsetHeight;

    switch (direction) {
      case 'left':
        if (cordX <= 0) return;
        setCurrentPosition({ x: positionX - containerWidth / FRAGMENT_SIZE, y: positionY });
        setCords({ x: cordX - 1, y: cordY });
        break;
      case 'right':
        if (cordX >= 15) return;
        setCurrentPosition({ x: positionX + containerWidth / FRAGMENT_SIZE, y: positionY });
        setCords({ x: cordX + 1, y: cordY });
        break;
      case 'up':
        if (cordY <= 0) return;
        setCurrentPosition({ x: positionX, y: positionY - containerHeight / FRAGMENT_SIZE });
        setCords({ x: cordX, y: cordY - 1 });
        break;
      case 'down':
        if (cordY >= 15) return;
        setCurrentPosition({ x: positionX, y: positionY + containerHeight / FRAGMENT_SIZE });
        setCords({ x: cordX, y: cordY + 1 });
        break;
    }
  };

  const squares = mapFragment().map(({ type, player, army, isTarget }, idx) =>
    <MapSquare
      // onClick={() => type !== 'empty' && handleCLick(idx)}
      onClick={() => handleNavigation('down')}
      key={idx}>
      {type === 'player' && player?.nickname}
    </MapSquare>,
  );

  return (
    <>
      <MapBackground ref={containerRef}>
        <MapImage
          src='/Arts/HomePage.jpg'
          positionX={positionX}
          positionY={positionY}
        />
        {squares}
      </MapBackground>
    </>
  );
};

export default WorldMap;
