import { compile, range } from "mathjs";
import { DataRange, GraphToolsLayout } from "@/modules/tools/graph";
import { EquationVisualizerHeader } from "./EquationVisualizerHeader";
import { useEquationVisualizerStore } from "../equationVisualizerStore";
import { useGraphStore } from "@/modules/tools/graph/graphStore";
import { useToast } from "@chakra-ui/react";
import { ReactElement, useEffect, useMemo, useRef } from "react";
import { Zoom } from "@visx/zoom";

const calculateExpr = (func: string) => {
  return compile(func);
};

export function EquationVisualizerView(): ReactElement {
  const equationVisualizerStore = useEquationVisualizerStore();
  const graphStore = useGraphStore();
  const toast = useToast();
  const errorToastRef = useRef<string | number | undefined>();

  console.log(graphStore.transformMatrix);

  const xDataRange = useMemo(
    () =>
      range(
        graphStore.axisRange.x.min,
        graphStore.axisRange.x.max + 1,
        0.5
      ).toArray() as Array<number>,
    []
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
    <GraphToolsLayout dataRange={dataRange}>
      <EquationVisualizerHeader />
    </GraphToolsLayout>
  );
}
