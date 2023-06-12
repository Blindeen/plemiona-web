import { Col, Row } from 'antd';

import { UnitImg, UnitNameTag, UnitTag } from './styles';
import { nameToDisplayName } from 'utils';

export interface UnitProps {
  name: string;
  width?: number;
  height?: number;
  count: number;
}

const UnitComponent = ({ name, width = 64, height = 64, count }: UnitProps) => {
  return (
    <Row align="middle" justify="center" gutter={[10, 0]}>
      <Col>
        <UnitImg type={name} width={width} height={height} />
      </Col>
      <Col>
        <UnitNameTag>{nameToDisplayName(name)} :</UnitNameTag>
      </Col>
      <Col>
        <UnitTag>{count}</UnitTag>
      </Col>
    </Row>
  );
};

export default UnitComponent;
