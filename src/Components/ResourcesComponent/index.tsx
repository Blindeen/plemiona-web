import { Col, Row, Tooltip } from 'antd';

import { ResourcesImg, ResourcesTag } from './styles';

export interface ResourcesProps {
  name: string;
  width?: number;
  height?: number;
  capacity: number;
  own: number;
  income?: number;
}

const ResourcesComponent = ({ name, width = 64, height = 64, capacity, own, income = 0 }: ResourcesProps) => {
  return (
    <Tooltip title={`${Math.round(income * 100) / 100} / s`}>
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
    </Tooltip>
  );
};

export default ResourcesComponent;
