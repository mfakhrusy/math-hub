import { curveNatural } from "@visx/curve";
import { LinePath } from "@visx/shape";
import { getX, getY, GraphData } from "../graphTools";
import { DataRange } from "../graphTools";
import { ScaleLinear } from "d3-scale";
import { ReactElement } from "react";

type Props = {
  dataRange: DataRange;
  xScale: ScaleLinear<number, number, never>;
  yScale: ScaleLinear<number, number, never>;
};

export function GraphFieldLine({
  dataRange,
  xScale,
  yScale,
}: Props): ReactElement {
  return (
    <LinePath<GraphData>
      curve={curveNatural}
      data={dataRange}
      x={(d) => xScale(getX(d)) ?? 0}
      y={(d) => yScale(getY(d)) ?? 0}
      stroke="#333333"
      strokeWidth={2}
      strokeOpacity={1}
    />
  );
}
