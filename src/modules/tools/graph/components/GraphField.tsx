import { Flex, transform } from "@chakra-ui/react";
import { AxisBottom, AxisLeft, AxisTop } from "@visx/axis";
import { Zoom } from "@visx/zoom";
import { scaleLinear } from "@visx/scale";
import { ReactElement, RefObject, useEffect, useRef, useState } from "react";
import { useGraphStore, initialTransformMatrix } from "../graphStore";
import { DataRange, GraphVariant } from "../graphTools";
import { GraphFieldLine } from "./GraphFieldLine";
import { GraphFieldScatter } from "./GraphFieldLineScatter";
import { ScaleLinear } from "d3-scale";
import { round } from "mathjs";

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
  zoomRef?: RefObject<Zoom> | null;
};

export function GraphField({
  dataRange,
  graphVariant,
  zoomRef,
}: Props): ReactElement {
  const graphFieldRef = useRef<HTMLDivElement>(null);
  const store = useGraphStore();

  const yPixelPerScale = round(
    (graphFieldRef.current?.clientHeight ?? 1) /
      (store.axisRange.y.max - store.axisRange.y.min),
    5
  );

  const xPixelPerScale = round(
    (graphFieldRef.current?.clientWidth ?? 1) /
      (store.axisRange.x.max - store.axisRange.x.min),
    5
  );

  // console.log("tes", yPixelPerScale, graphFieldRef.current?.clientHeight ?? 11, store.axisRange.y.max, store.axisRange.y.min, store.axisRange.y.max - store.axisRange.y.min);

  useEffect(() => {
    console.log("yahahah");
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
        const xTotalScale = width / yPixelPerScale;

        store.setAxisRange({
          x: {
            max: xTotalScale / 2,
            min: (-1 * xTotalScale) / 2,
          },
          y: store.axisRange.y,
        });
      } else {
        const yTotalScale = height / xPixelPerScale;

        store.setAxisRange({
          y: {
            max: yTotalScale / 2,
            min: (-1 * yTotalScale) / 2,
          },
          x: store.axisRange.x,
        });
      }
    }
  }, [graphFieldRef?.current?.clientWidth]);

  // const xScaleMin = useRef(store.axisRange.x.min);
  // const xScaleMax = useRef(store.axisRange.x.max);

  // useEffect(() => {
  //   console.log("berubah x");
  // }, [xScaleMin, xScaleMax]);

  const xScale = scaleLinear<number>({
    // domain: [xScaleMin.current, xScaleMax.current],
    range: [0, store.graphFieldSize.width],
  });

  // const yScaleMin = useRef(store.axisRange.y.min);
  // const yScaleMax = useRef(store.axisRange.y.max);

  // console.log(yScaleMin.current)

  const yScale = scaleLinear<number>({
    // domain: [yScaleMin.current, yScaleMax.current],
    range: [store.graphFieldSize.height, 0],
  });

  // const [transformMatrix, setTransformMatrix] = useState<
  //   typeof initialTransform
  // >(initialTransform);

  // console.log("ghaha")
  // useEffect(() => {
  //   // const yScaleMin =
  //   //   store.axisRange.y.min / transformMatrix.scaleY +
  //   //   (transformMatrix.translateY / transformMatrix.scaleY) / yPixelPerScale;
  //   const yScaleMin =
  //     store.axisRange.y.min + transformMatrix.translateY / yPixelPerScale;

  //   // console.log(transformMatrix.translateY, store.axisRange.y.min, yScaleMin, yPixelPerScale, transformMatrix);

  //   const yScaleMax =
  //     store.axisRange.y.max / transformMatrix.scaleY +
  //     transformMatrix.translateY / transformMatrix.scaleY / yPixelPerScale;

  //   const xScaleMin =
  //     store.axisRange.x.min / transformMatrix.scaleX -
  //     transformMatrix.translateX / transformMatrix.scaleX / xPixelPerScale;

  //   const xScaleMax =
  //     store.axisRange.x.max / transformMatrix.scaleX -
  //     transformMatrix.translateX / transformMatrix.scaleX / xPixelPerScale;

  //   console.log(xScaleMin, xScaleMax, transformMatrix);

  //       // yScale.domain([yScaleMin, yScaleMax]);
  //       // xScale.domain([xScaleMin, xScaleMax]);

  //   store.setAxisRange({
  //     x: {
  //       max: xScaleMax,
  //       min: xScaleMin,
  //     },
  //     y: {
  //       max: yScaleMax,
  //       min: yScaleMin,
  //     },
  //   });
  // }, [transformMatrix.translateX, transformMatrix.translateY]);

  if (store.headerHeight === 0) {
    return <div />;
  }
  return (
    <Zoom
      ref={zoomRef}
      width={store.graphFieldSize.width}
      height={store.graphFieldSize.height}
      scaleXMin={0.1}
      scaleXMax={10}
      scaleYMin={0.1}
      scaleYMax={10}
      transformMatrix={initialTransformMatrix}
    >
      {(zoom) => {
        // store.setTransformMatrix(zoom.transformMatrix);
        // setTransformMatrix(zoom.transformMatrix);
        // const yScaleMin =
        //   (store.axisRange.y.min / zoom.transformMatrix.scaleY +
        //     yScale.invert((yScale(0) - zoom.transformMatrix.translateY)) / zoom.transformMatrix.scaleY) 
        const yScaleMin =
          store.axisRange.y.min / zoom.transformMatrix.scaleY +
          zoom.transformMatrix.translateY /
            zoom.transformMatrix.scaleY /
            yPixelPerScale;
        // console.log(yScale.invert(850), yScale(0), zoom.transformMatrix.translateY,/*yScale.invert((yScale(0) - zoom.transformMatrix.translateY) / zoom.transformMatrix.scaleY), yScaleMin*/)

        // const yScaleMax =
        //   (store.axisRange.y.max / zoom.transformMatrix.scaleY +
        //     yScale.invert((yScale(0) - zoom.transformMatrix.translateY)) / zoom.transformMatrix.scaleY)
        const yScaleMax =
          store.axisRange.y.max / zoom.transformMatrix.scaleY +
          zoom.transformMatrix.translateY /
            zoom.transformMatrix.scaleY /
            yPixelPerScale;
        // console.log(
        //   zoom.transformMatrix.scaleX,
        //   zoom.transformMatrix.scaleY,
        //   yScale(0),
        //   zoom.transformMatrix.translateY
        // );

        yScale.domain([yScaleMin, yScaleMax]);
        // yScale.domain([store.axisRange.y.min, store.axisRange.y.max])

        // const xScaleMin =
        //   (store.axisRange.x.min +
        //     xScale.invert(xScale(0) - zoom.transformMatrix.translateX)) /
        //   zoom.transformMatrix.scaleX;
        const xScaleMin =
          store.axisRange.x.min / zoom.transformMatrix.scaleX -
          zoom.transformMatrix.translateX /
            zoom.transformMatrix.scaleX /
            xPixelPerScale;

        // const xScaleMax =
        //   (store.axisRange.x.max +
        //     xScale.invert(xScale(0) - zoom.transformMatrix.translateX)) /
        //   zoom.transformMatrix.scaleX;
        const xScaleMax =
          store.axisRange.x.max / zoom.transformMatrix.scaleX -
          zoom.transformMatrix.translateX /
            zoom.transformMatrix.scaleX /
            xPixelPerScale;

        xScale.domain([xScaleMin, xScaleMax]);
        // xScale.domain([store.axisRange.x.min, store.axisRange.x.max])

        // if (xScaleMin.current !== store.axisRange.x.min)  {
        //   console.log("yes", xScaleMin.current, store.axisRange.x.min)

        // store.setAxisRange({
        //   x: {
        //     max: xScaleMax.current,
        //     min: xScaleMin.current
        //   },
        //   y: {
        //     max: yScaleMax,
        //     min: yScaleMin
        //   }
        // })
        // }

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
                  // top={store.graphFieldSize.height / 2}
                  top={
                    store.graphFieldSize.height / 2 +
                    zoom.transformMatrix.translateY
                  }
                />
                <AxisLeft
                  scale={yScale}
                  // left={store.graphFieldSize.width / 2}
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
