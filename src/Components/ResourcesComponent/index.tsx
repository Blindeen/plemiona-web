import { Col, Row } from 'antd';

import { ResourceImg, ResourceTag } from './styles';

export interface ResourcesProps {
  name: string;
  width?: number;
  height?: number;
  capacity?: number;
  own: number;
}

const Resource = ({ name, width = 64, height = 64, capacity, own }: ResourcesProps) => {
  return (
    <Row align="middle" justify="center" gutter={[10, 0]}>
      <Col>
        <ResourceImg type={name} width={width} height={height} />
      </Col>
      <Col>
        <ResourceTag>{capacity ? `${Math.floor(own)} / ${Math.floor(capacity)}` : Math.floor(own)}</ResourceTag>
      </Col>
    </Row>
  );
};

export default Resource;
