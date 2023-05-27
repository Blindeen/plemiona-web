import { BuildingLvL, Container, Warehouse } from 'Containers/Village/styles';
import { useState } from 'react';

const Village = () => {
  const [warehouseLvl, setWarehouseLvl] = useState(1);

  return (
    <Container>
      <Warehouse>
        <BuildingLvL>{warehouseLvl}</BuildingLvL>
      </Warehouse>
    </Container>
  );
};

export default Village;
