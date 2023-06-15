import { Col, InputNumber, Row } from 'antd';

import { NameTag, TimeTag } from 'Containers/UpgradeView/UpgradeContainer/styles';
import ResourcesComponent from 'Components/ResourcesComponent';

import { stringToTitle, upgradeDurationSecondsLabel } from 'utils';
import { UnitInterface } from 'GameSessionContext';
import palette from 'palette';

export interface RecruitmentContainerProps {
  name: string;
  unit: UnitInterface;
  input: number;
  setInput: (e: number) => void;
}

const RecruitmentContainer = ({ name, unit, input, setInput }: RecruitmentContainerProps) => {
  return (
    <Row align="middle" justify="center" gutter={[10, 0]}>
      <Col span={4}>
        <NameTag>{stringToTitle(name)}</NameTag>
        <NameTag>Count : {unit.count}</NameTag>
      </Col>
      <Col span={4}>
        <ResourcesComponent name="wood" own={unit.trainingCost.wood} />
      </Col>
      <Col span={4}>
        <ResourcesComponent name="clay" own={unit.trainingCost.clay} />
      </Col>
      <Col span={4}>
        <ResourcesComponent name="iron" own={unit.trainingCost.iron} />
      </Col>
      <Col span={5}>
        <TimeTag>{upgradeDurationSecondsLabel(unit.trainingDuration)}</TimeTag>
      </Col>
      <Col span={3}>
        <InputNumber
          style={{ backgroundColor: `${palette.dadsRayOfSunshine}`, borderColor: 'black', width: 75 }}
          maxLength={2}
          min={0}
          max={10}
          onChange={(value) => setInput(value === null ? 0 : value)}
        />
      </Col>
    </Row>
  );
};

export default RecruitmentContainer;
