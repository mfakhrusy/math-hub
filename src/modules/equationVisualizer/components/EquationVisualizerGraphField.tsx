import { Flex } from "@chakra-ui/react";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { curveNatural } from "@visx/curve";
import { scaleLinear } from "@visx/scale";
import { LinePath } from "@visx/shape";
import { compile, range } from "mathjs";
import { useEffect, useRef } from "react";
import { useEquationVisualizerStore } from "../equationVisualizerStore";

type Data = {
  x: number;
  y: number;
};

const calculateExpr = (func: string) => compile(func);

const getX = (d: Data) => d.x;
const getY = (d: Data) => d.y;

export function EquationVisualizerGraphField() {
  const graphFieldRef = useRef<HTMLDivElement>(null);
  const store = useEquationVisualizerStore();

  useEffect(() => {
    if (graphFieldRef?.current?.clientHeight) {
      store.setGraphFieldSize({
        width: graphFieldRef?.current?.clientWidth,
        height: graphFieldRef?.current?.clientHeight,
      });
    }
  }, [graphFieldRef?.current?.clientHeight]);

  const xSet = range(
    store.axisRange.x.min,
    store.axisRange.x.max + 1,
    0.1
  ).toArray() as Array<number>;

  const ySet: Array<number> = xSet.map((x: number) =>
    calculateExpr(store.displayedFunc).evaluate({ x: x })
  );

  const xScale = scaleLinear<number>({
    domain: [store.axisRange.x.min, store.axisRange.x.max],
  });

  const yScale = scaleLinear<number>({
    domain: [store.axisRange.y.min, store.axisRange.y.max],
  });

  const data: Array<Data> = xSet.map((x: number, i) => ({
    x: x,
    y: ySet[i],
  }));

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
            data={data}
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
