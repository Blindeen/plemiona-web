import { Col, Row } from 'antd';

import { ResourcesImg } from './styles';

export interface ResourcesProps {
  name: string;
  width?: number;
  height?: number;
  capacity: number;
  own: number;
}

const ResourcesComponent = ({ name, width = 64, height = 64, capacity, own }: ResourcesProps) => {
  return (
    <Row align={'middle'} gutter={[10, 0]}>
      <Col style={{ margin: 'auto' }}>
        <ResourcesImg
          style={{
            width: width,
            height: height,
            backgroundImage: `url('/Assets/ResourcesIcons/${name}.png')`,
          }}
        />
      </Col>
      <Col style={{ margin: 'auto' }}>
        {Math.floor(own)}/{Math.floor(capacity)}
      </Col>
    </Row>
  );
};

export default ResourcesComponent;
