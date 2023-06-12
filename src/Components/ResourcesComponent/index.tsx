import { Col, Row } from 'antd';

import { ResourcesImg, ResourcesTag } from './styles';

export interface ResourcesProps {
  name: string;
  width?: number;
  height?: number;
  capacity: number;
  own: number;
}

const ResourcesComponent = ({ name, width = 64, height = 64, capacity, own }: ResourcesProps) => {
  return (
    <Row align={'middle'} justify={'center'} gutter={[10, 0]}>
      <Col style={{ margin: 'auto' }}>
        <ResourcesImg
          style={{
            width: width,
            height: height,
            backgroundImage: `url('/Assets/ResourcesIcons/${name}.png')`,
          }}
        />
      </Col>
      <Col>
        <ResourcesTag>
          {Math.floor(own)} / {Math.floor(capacity)}
        </ResourcesTag>
      </Col>
    </Row>
  );
};

export default ResourcesComponent;
