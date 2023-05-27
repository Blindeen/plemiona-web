import styled from 'styled-components';
import palette from 'palette';

export const Container = styled('div')`
  position: absolute;
  background-image: url('/Arts/Village.jpg');
  width: 760px;
  height: 760px;
  min-width: 760px;
  min-height: 760px;
  margin-right: 800px;
  border: 5px solid #5d4a44;
  box-shadow: ${palette.black} 0 0 5px 5px;
  border-radius: 12px;
`;

export const Warehouse = styled('div')`
  position: absolute;
  width: 256px;
  height: 256px;
  margin-top: 60px;
  margin-left: 60px;
  background-image: url('/Assets/Buildings/Spichlerz-Tier-1-min.png');
  background-repeat: no-repeat;
`;

export const BuildingLvL = styled('div')`
  position: absolute;
  width: fit-content;
  height: fit-content;
  opacity: 70%;
  font-weight: 700;
  font-family: Arial, sans-serif;
  font-size: 20px;
  border: 2px solid ${palette.black};
  border-radius: 4px;
  background-color: ${palette.dadsRayOfSunshine};
`;

export const Building = styled('div')``;
