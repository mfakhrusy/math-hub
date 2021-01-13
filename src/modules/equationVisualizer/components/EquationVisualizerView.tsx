import { compile, range } from "mathjs";
import { DataRange, GraphToolsLayout } from "@/modules/tools/graph";
import { EquationVisualizerHeader } from "./EquationVisualizerHeader";
import { useEquationVisualizerStore } from "../equationVisualizerStore";
import { useGraphStore } from "@/modules/tools/graph/graphStore";
import { useToast } from "@chakra-ui/react";
import { useRef } from "react";

const calculateExpr = (func: string) => {
  return compile(func);
};

export function EquationVisualizerView() {
  const equationVisualizerStore = useEquationVisualizerStore();
  const graphStore = useGraphStore();
  const toast = useToast();
  const errorToastRef = useRef<string | number | undefined>();

  const xDataRange = range(
    graphStore.axisRange.x.min,
    graphStore.axisRange.x.max + 1,
    0.1
  ).toArray() as Array<number>;

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
