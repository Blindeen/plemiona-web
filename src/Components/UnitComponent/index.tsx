import { Col, Row } from 'antd';
import { UnitImg, UnitNameTag, UnitTag } from 'Components/UnitComponent/styles';
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
      <Col style={{ margin: 'auto' }}>
        <UnitImg type={name} width={width} height={height}></UnitImg>
      </Col>
      <Col>
        <UnitNameTag>{nameToDisplayName(name)} :</UnitNameTag>
      </Col>
      <Col style={{ margin: 'auto' }}>
        <UnitTag>{count}</UnitTag>
      </Col>
    </Row>
  );
};

export default UnitComponent;
