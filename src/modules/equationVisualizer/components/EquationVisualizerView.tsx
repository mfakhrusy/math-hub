import { compile, floor, range } from "mathjs";
import { DataRange, GraphToolsLayout } from "@/modules/tools/graph";
import { EquationVisualizerHeader } from "./EquationVisualizerHeader";
import { useEquationVisualizerStore } from "../equationVisualizerStore";
import { useGraphStore } from "@/modules/tools/graph/graphStore";
import { useToast } from "@chakra-ui/react";
import { ReactElement, useMemo, useRef } from "react";
import { withZoom } from "@/modules/tools/graph/lib/withZoom";
import { ZoomType } from "@/modules/tools/graph/graphTools";

const calculateExpr = (func: string) => {
  return compile(func);
};

const calcStep = (scale: number) => {
  if (scale > 10) {
    return 0.1;
  } else if (scale > 5) {
    return 0.3;
  } else if (scale > 1) {
    return 0.5;
  } else if (scale > 0.5) {
    return 1;
  } else {
    return 1.5;
  }
};

const calcMaxDecimalMultiplier = (scale: number) => {
  if (scale > 10) {
    return 10;
  } else if (scale >= 1) {
    return 1;
  } else {
    return 0.1;
  }
};

type Props = {
  zoom: ZoomType;
};

function EquationVisualizerViewWrapped({ zoom }: Props): ReactElement {
  const equationVisualizerStore = useEquationVisualizerStore();
  const graphStore = useGraphStore();
  const toast = useToast();
  const errorToastRef = useRef<string | number | undefined>();

  const scaleX = useMemo(() => floor(zoom.transformMatrix.scaleX * 100) / 100, [
    zoom.transformMatrix.scaleX,
  ]);

  const xPixelPerScale = useMemo(
    () =>
      graphStore.graphFieldSize.width /
      (graphStore.axisRange.x.min - graphStore.axisRange.x.max),
    [
      graphStore.graphFieldSize.width,
      graphStore.axisRange.x.min,
      graphStore.axisRange.x.max,
    ]
  );

  const xMinTmp = useMemo(
    () =>
      (graphStore.axisRange.x.min +
        zoom.transformMatrix.translateX / xPixelPerScale) /
      scaleX,
    [
      graphStore.axisRange.x.min,
      zoom.transformMatrix.translateX,
      xPixelPerScale,
      scaleX,
    ]
  );
  const xMaxTmp = useMemo(
    () =>
      (graphStore.axisRange.x.max +
        zoom.transformMatrix.translateX / xPixelPerScale) /
      scaleX,
    [
      graphStore.axisRange.x.max,
      zoom.transformMatrix.translateX,
      xPixelPerScale,
      scaleX,
    ]
  );

  const xMin = useMemo(
    () =>
      floor(xMinTmp * calcMaxDecimalMultiplier(scaleX)) /
      calcMaxDecimalMultiplier(scaleX),
    [scaleX, xMinTmp]
  );
  const xMax = useMemo(
    () =>
      floor(xMaxTmp * calcMaxDecimalMultiplier(scaleX)) /
      calcMaxDecimalMultiplier(scaleX),
    [scaleX, xMaxTmp]
  );

  const xDataRange = useMemo(
    () =>
      range(
        xMin,
        xMax + 2 / calcMaxDecimalMultiplier(scaleX),
        calcStep(scaleX) * 0.2
      ).toArray() as Array<number>,
    [xMin, xMax]
  );

  try {
    const yDataRange = useMemo(
      () =>
        xDataRange.map((x: number) => {
          return calculateExpr(equationVisualizerStore.displayedFunc).evaluate({
            x: x,
          });
        }),
      [xDataRange, equationVisualizerStore.displayedFunc]
    );

    const dataRange: DataRange = xDataRange.map((x: number, i) => ({
      x,
      y: yDataRange[i],
    }));

    console.log(calcStep(scaleX));

    return (
      <GraphToolsLayout dataRange={dataRange} zoom={zoom}>
        <EquationVisualizerHeader />
      </GraphToolsLayout>
    );
  } catch (err) {
    if (errorToastRef.current) {
      toast.close(errorToastRef.current);
    }

    errorToastRef.current = toast({
      status: "error",
      title: `Error: '${equationVisualizerStore.displayedFunc}' is not a valid math expression`,
      position: "top",
    });
    equationVisualizerStore.setDisplayedFunc("");
  }

  return <div />;
}

export const EquationVisualizerView = withZoom(EquationVisualizerViewWrapped);
