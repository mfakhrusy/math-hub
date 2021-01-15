import { Circle } from "@visx/shape";
import { Group } from "@visx/group";
import { DataRange } from "../graphTools";
import { ScaleLinear } from "d3-scale";
import { ReactElement } from "react";

type Props = {
  dataRange: DataRange;
  xScale: ScaleLinear<number, number, never>;
  yScale: ScaleLinear<number, number, never>;
};

export function GraphFieldScatter({
  dataRange,
  xScale,
  yScale,
}: Props): ReactElement {
  console.log(dataRange);
  return (
    <Group>
      {dataRange.map(({ x, y }, i) => (
        <Circle
          key={`point-${i}`}
          cx={xScale(x)}
          cy={yScale(y)}
          fill="#002200"
          r={2}
        />
      ))}
    </Group>
  );
}
