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
    <Row align={'middle'}>
      <Col>
        <ResourcesImg
          style={{
            width: width,
            height: height,
            backgroundImage: `url('/Assets/ResourcesIcons/${name}.png')`,
          }}
        />
      </Col>
      <Col>
        {own}/{capacity}
      </Col>
    </Row>
  );
};

export default ResourcesComponent;
