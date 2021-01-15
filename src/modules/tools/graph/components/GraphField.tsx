import { Flex } from "@chakra-ui/react";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { scaleLinear } from "@visx/scale";
import { ReactElement, useEffect, useRef } from "react";
import { useGraphStore } from "../graphStore";
import { DataRange, GraphVariant } from "../graphTools";
import { GraphFieldLine } from "./GraphFieldLine";
import { GraphFieldScatter } from "./GraphFieldLineScatter";

type Props = {
  dataRange: DataRange;
  graphVariant: GraphVariant;
};

export function GraphField({ dataRange, graphVariant }: Props): ReactElement {
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

  const renderGraphField = (graphVariant: GraphVariant) => {
    switch (graphVariant) {
      case "Line":
        return (
          <GraphFieldLine
            xScale={xScale}
            yScale={yScale}
            dataRange={dataRange}
          />
        );
      case "Scatter":
        return (
          <GraphFieldScatter
            xScale={xScale}
            yScale={yScale}
            dataRange={dataRange}
          />
        );
      default:
        return null;
    }
  };

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
          {renderGraphField(graphVariant)}
        </svg>
      )}
    </Flex>
  );
}
