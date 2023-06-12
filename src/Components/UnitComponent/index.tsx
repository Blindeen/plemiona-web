import { Col, Row } from 'antd';

import { UnitImg, UnitTag } from './styles';

export interface UnitProps {
  name: string;
  width?: number;
  height?: number;
  count: number;
}

const UnitComponent = ({ name, width = 64, height = 64, count }: UnitProps) => {
  return (
    <Row align='middle' justify='start' gutter={[10, 0]}>
      <Col>
        <UnitImg type={name} width={width} height={height} />
      </Col>
      <Col>
        <UnitTag>{count}</UnitTag>
      </Col>
    </Row>
  );
};

export default UnitComponent;
