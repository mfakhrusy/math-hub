import { compile, range } from "mathjs";
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

type Props = {
  zoom: ZoomType;
};

function EquationVisualizerViewWrapped({ zoom }: Props): ReactElement {
  const equationVisualizerStore = useEquationVisualizerStore();
  const graphStore = useGraphStore();
  const toast = useToast();
  const errorToastRef = useRef<string | number | undefined>();

  const xPixelPerScale = graphStore.graphFieldSize.width / (graphStore.axisRange.x.min - graphStore.axisRange.x.max);

  const xMin = (graphStore.axisRange.x.min + zoom.transformMatrix.translateX / xPixelPerScale) / zoom.transformMatrix.scaleX;
  const xMax = (graphStore.axisRange.x.max + zoom.transformMatrix.translateX / xPixelPerScale) / zoom.transformMatrix.scaleX;

  console.log(xPixelPerScale, zoom.transformMatrix.translateX, xMin, xMax);

  const xDataRange = useMemo(
    () =>
      range(
        // graphStore.axisRange.x.min,
        // graphStore.axisRange.x.max + 1,
        xMin,
        xMax + 1,
        0.5
      ).toArray() as Array<number>,
    [xMin, xMax]
  );

  let yDataRange: Array<number> = [];

  try {
    yDataRange = xDataRange.map((x: number) =>
      calculateExpr(equationVisualizerStore.displayedFunc).evaluate({ x: x })
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

  const dataRange: DataRange = xDataRange.map((x: number, i) => ({
    x: x,
    y: yDataRange[i],
  }));

  return (
    <GraphToolsLayout dataRange={dataRange} zoom={zoom}>
      <EquationVisualizerHeader />
    </GraphToolsLayout>
  );
}

export const EquationVisualizerView = withZoom(EquationVisualizerViewWrapped);
