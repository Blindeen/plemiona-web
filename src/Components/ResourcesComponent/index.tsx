import { ResourcesImg } from './styles';
import { Col, Row } from 'antd';

interface ResourcesProps {
  name: string;
  width: number;
  height: number;
  capacity: number;
  own: number;
}

const ResourcesComponent = ({ name, width, height, capacity, own }: ResourcesProps) => {
  return (
    <Row align={'middle'}>
      <Col>
        <ResourcesImg
          style={{
            width: width,
            height: height,
            backgroundImage: `url('/Assets/ResourcesIcons/${name}.png')`,
          }}
        ></ResourcesImg>
      </Col>
      <Col>
        {own}/{capacity}
      </Col>
    </Row>
  );
};

export default ResourcesComponent;
