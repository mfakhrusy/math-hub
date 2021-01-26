import { Flex } from "@chakra-ui/react";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { scaleLinear } from "@visx/scale";
import { ReactElement, useEffect, useRef } from "react";
import { useGraphStore } from "../graphStore";
import { DataRange, GraphVariant, ZoomType } from "../graphTools";
import { GraphFieldLine } from "./GraphFieldLine";
import { GraphFieldScatter } from "./GraphFieldLineScatter";
import { ScaleLinear } from "d3-scale";
import { ScaleSVG } from "@visx/responsive";

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
  zoom: ZoomType;
};

export function GraphField({
  dataRange,
  graphVariant,
  zoom,
}: Props): ReactElement {
  const graphFieldRef = useRef<HTMLDivElement>(null);
  const store = useGraphStore();

  useEffect(() => {
    if (graphFieldRef?.current?.clientHeight) {
      const width = graphFieldRef.current.clientWidth;
      const height = graphFieldRef.current.clientHeight;
      const isWidthBiggerThanHeight = width > height;

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

  const yPixelPerScale =
    (graphFieldRef.current?.clientHeight ?? 0) /
    (store.axisRange.y.max - store.axisRange.y.min);

  const xPixelPerScale =
    (graphFieldRef.current?.clientWidth ?? 0) /
    (store.axisRange.x.max - store.axisRange.x.min);

  const yScaleMin =
    store.axisRange.y.min / (zoom.transformMatrix?.scaleY ?? 1) +
    (zoom.transformMatrix?.translateY ?? 0) /
      (zoom.transformMatrix?.scaleY ?? 1) /
      yPixelPerScale;

  const yScaleMax =
    store.axisRange.y.max / (zoom.transformMatrix?.scaleY ?? 1) +
    (zoom.transformMatrix?.translateY ?? 0) /
      (zoom.transformMatrix?.scaleY ?? 1) /
      yPixelPerScale;

  yScale.domain([yScaleMin, yScaleMax]);

  const xScaleMin =
    store.axisRange.x.min / (zoom.transformMatrix?.scaleX ?? 1) -
    (zoom.transformMatrix?.translateX ?? 0) /
      (zoom.transformMatrix?.scaleX ?? 1) /
      xPixelPerScale;

  const xScaleMax =
    store.axisRange.x.max / (zoom.transformMatrix?.scaleX ?? 1) -
    (zoom.transformMatrix?.translateX ?? 0) /
      (zoom.transformMatrix?.scaleX ?? 1) /
      xPixelPerScale;

  xScale.domain([xScaleMin, xScaleMax]);

  if (store.headerHeight === 0) {
    return <div />;
  }

  return (
    <Flex
      width="100%"
      backgroundColor="white"
      height={`calc(100vh - ${store.headerHeight}px)`}
      ref={graphFieldRef}
    >
      {graphFieldRef.current && (
        <ScaleSVG
          width={store.graphFieldSize.width}
          height={store.graphFieldSize.height}
        >
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
                store.graphFieldSize.width / 2 + zoom.transformMatrix.translateX
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
        </ScaleSVG>
      )}
    </Flex>
  );
}
