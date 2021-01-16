import { Flex } from "@chakra-ui/react";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { Zoom } from "@visx/zoom";
import { scaleLinear } from "@visx/scale";
import { ReactElement, useEffect, useRef } from "react";
import { useGraphStore } from "../graphStore";
import { DataRange, GraphVariant } from "../graphTools";
import { GraphFieldLine } from "./GraphFieldLine";
import { GraphFieldScatter } from "./GraphFieldLineScatter";
import { max } from "mathjs";
import { ScaleLinear } from "d3-scale";

const renderGraphField = (
  graphVariant: GraphVariant,
  transform: string,
  xScale: ScaleLinear<number, number>,
  yScale: ScaleLinear<number, number>,
  dataRange: DataRange
) => {
  switch (graphVariant) {
    case "Line":
      return (
        <GraphFieldLine
          xScale={xScale}
          yScale={yScale}
          dataRange={dataRange}
          transform={transform}
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

type Props = {
  dataRange: DataRange;
  graphVariant: GraphVariant;
};

const initialTransform = {
  scaleX: 1,
  scaleY: 1,
  translateX: 0,
  translateY: 0,
  skewX: 0,
  skewY: 0,
};

export function GraphField({ dataRange, graphVariant }: Props): ReactElement {
  const graphFieldRef = useRef<HTMLDivElement>(null);
  const store = useGraphStore();

  useEffect(() => {
    if (graphFieldRef?.current?.clientHeight) {
      const width = graphFieldRef.current.clientWidth;
      const height = graphFieldRef.current.clientHeight;
      const isWidthBiggerThanHeight = width > height;

      console.log(graphFieldRef.current.offsetTop);

      store.setIsWidthBiggerThanHeight(isWidthBiggerThanHeight);

      store.setGraphFieldSize({
        width,
        height,
      });

      if (isWidthBiggerThanHeight) {
        const pixelPerScale =
          height / (store.axisRange.y.max - store.axisRange.y.min);

        const xTotalScale = width / pixelPerScale;

        store.setXAxisRange({
          x: {
            max: xTotalScale / 2,
            min: (-1 * xTotalScale) / 2,
          },
          y: store.axisRange.y,
        });
      } else {
        const pixelPerScale =
          width / (store.axisRange.x.max - store.axisRange.x.min);

        const yTotalScale = height / pixelPerScale;

        store.setYAxisRange({
          y: {
            max: yTotalScale / 2,
            min: (-1 * yTotalScale) / 2,
          },
          x: store.axisRange.x,
        });
      }
    }
  }, [graphFieldRef?.current?.clientWidth]);

  const xScale = scaleLinear<number>({
    domain: [store.axisRange.x.min, store.axisRange.x.max],
    range: [0, store.graphFieldSize.width],
  });

  const yScale = scaleLinear<number>({
    domain: [store.axisRange.y.min, store.axisRange.y.max],
    range: [store.graphFieldSize.height, 0],
  });

  if (store.headerHeight === 0) {
    return <div />;
  }
  return (
    <Zoom
      width={store.graphFieldSize.width}
      height={store.graphFieldSize.height}
      scaleXMin={0.1}
      scaleXMax={10}
      scaleYMin={0.1}
      scaleYMax={10}
      transformMatrix={initialTransform}
    >
      {(zoom) => {
        const yPixelPerScale =
          (graphFieldRef.current?.clientHeight ?? 0) /
          (store.axisRange.y.max - store.axisRange.y.min);

        const xPixelPerScale =
          (graphFieldRef.current?.clientWidth ?? 0) /
          (store.axisRange.x.max - store.axisRange.x.min);

        const yScaleMin =
          store.axisRange.y.min / zoom.transformMatrix.scaleY +
          zoom.transformMatrix.translateY /
            zoom.transformMatrix.scaleY /
            yPixelPerScale;

        const yScaleMax =
          store.axisRange.y.max / zoom.transformMatrix.scaleY +
          zoom.transformMatrix.translateY /
            zoom.transformMatrix.scaleY /
            yPixelPerScale;

        yScale.domain([yScaleMin, yScaleMax]);

        // yScale.range([store.graphFieldSize.height + zoom.transformMatrix.translateY, 0])

        // yScale.invert

        const xScaleMin =
          store.axisRange.x.min / zoom.transformMatrix.scaleX -
          zoom.transformMatrix.translateX /
            zoom.transformMatrix.scaleX /
            xPixelPerScale;

        const xScaleMax =
          store.axisRange.x.max / zoom.transformMatrix.scaleX -
          zoom.transformMatrix.translateX /
            zoom.transformMatrix.scaleX /
            xPixelPerScale;

        xScale.domain([xScaleMin, xScaleMax]);

        // console.log(
        //   "tes",
        //   zoom.transformMatrix.translateY,
        //   zoom.transformMatrix.scaleY,
        //   yScaleMin,
        //   yScaleMax,
        // );
        // yScale.domain([
        //   yScale.invert(
        //     (yScale(0) - zoom.transformMatrix.translateY) /
        //       zoom.transformMatrix.scaleY
        //   ) + store.axisRange.y.min,
        //   yScale.invert(
        //     (yScale(max(dataRange.map(({ y }) => y))) -
        //       zoom.transformMatrix.translateY) /
        //       zoom.transformMatrix.scaleY
        //   ) + store.axisRange.y.max,
        // ]);
        // xScale.domain([
        //   xScale.invert(
        //     (xScale(0) - zoom.transformMatrix.translateX) /
        //       zoom.transformMatrix.scaleX
        //   ) + store.axisRange.x.min,
        //   xScale.invert(
        //     (xScale(max(dataRange.map(({ x }) => x))) -
        //       zoom.transformMatrix.translateX) /
        //       zoom.transformMatrix.scaleX
        //   ) + store.axisRange.x.max,
        // ]);
        return (
          <Flex
            width="100%"
            backgroundColor="white"
            height={`calc(100vh - ${store.headerHeight}px)`}
            ref={graphFieldRef}
          >
            {graphFieldRef.current && (
              <svg
                width={store.graphFieldSize.width}
                height={store.graphFieldSize.height}
              >
                <AxisBottom
                  scale={xScale}
                  top={
                    store.graphFieldSize.height / 2 +
                    zoom.transformMatrix.translateY
                  }
                />
                <AxisLeft
                  scale={yScale}
                  left={
                    store.graphFieldSize.width / 2 +
                    zoom.transformMatrix.translateX
                  }
                />
                {renderGraphField(
                  graphVariant,
                  zoom.toString(),
                  xScale,
                  yScale,
                  dataRange
                )}
                <rect
                  fill="transparent"
                  width={store.graphFieldSize.width}
                  height={store.graphFieldSize.height}
                  rx={14}
                  onTouchStart={zoom.dragStart}
                  onTouchMove={zoom.dragMove}
                  onTouchEnd={zoom.dragEnd}
                  onMouseDown={zoom.dragStart}
                  onMouseMove={zoom.dragMove}
                  onMouseUp={zoom.dragEnd}
                  onMouseLeave={() => {
                    if (zoom.isDragging) {
                      zoom.dragEnd();
                    }
                  }}
                />
              </svg>
            )}
          </Flex>
        );
      }}
    </Zoom>
  );
}
