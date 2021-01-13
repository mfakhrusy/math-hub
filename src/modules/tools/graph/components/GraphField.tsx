import { Flex } from "@chakra-ui/react";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { curveNatural } from "@visx/curve";
import { scaleLinear } from "@visx/scale";
import { LinePath } from "@visx/shape";
import { useEffect, useRef } from "react";
import { useGraphStore } from "../graphStore";

type Data = {
  x: number;
  y: number;
};

export type DataRange = Array<Data>;

const getX = (d: Data) => d.x;
const getY = (d: Data) => d.y;

type Props = {
  dataRange: DataRange;
};

export function GraphField({ dataRange }: Props) {
  const graphFieldRef = useRef<HTMLDivElement>(null);
  const store = useGraphStore();

  useEffect(() => {
    if (graphFieldRef?.current?.clientHeight) {
      store.setGraphFieldSize({
        width: graphFieldRef?.current?.clientWidth,
        height: graphFieldRef?.current?.clientHeight,
      });
    }
  }, [graphFieldRef?.current?.clientHeight]);

  const xScale = scaleLinear<number>({
    domain: [store.axisRange.x.min, store.axisRange.x.max],
  });

  const yScale = scaleLinear<number>({
    domain: [store.axisRange.y.min, store.axisRange.y.max],
  });

  xScale.range([0, store.graphFieldSize.width]);
  yScale.range([store.graphFieldSize.height, 0]);

  return (
    <Flex
      width="100%"
      backgroundColor="white"
      height="100%"
      ref={graphFieldRef}
    >
      {graphFieldRef.current && (
        <svg width="100%" height="100%">
          <AxisBottom scale={xScale} top={store.graphFieldSize.height / 2} />
          <AxisLeft scale={yScale} left={store.graphFieldSize.width / 2} />
          <LinePath<Data>
            curve={curveNatural}
            data={dataRange}
            x={(d) => xScale(getX(d)) ?? 0}
            y={(d) => yScale(getY(d)) ?? 0}
            stroke="#333333"
            strokeWidth={2}
            strokeOpacity={1}
          />
        </svg>
      )}
    </Flex>
  );
}
