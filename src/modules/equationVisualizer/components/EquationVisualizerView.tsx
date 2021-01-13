import { compile, range } from "mathjs";
import { DataRange, GraphToolsLayout } from "@/modules/tools/graph";
import { EquationVisualizerHeader } from "./EquationVisualizerHeader";
import { useEquationVisualizerStore } from "../equationVisualizerStore";
import { useGraphStore } from "@/modules/tools/graph/graphStore";

const calculateExpr = (func: string) => compile(func);

export function EquationVisualizerView() {
  const equationVisualizerStore = useEquationVisualizerStore();
  const graphStore = useGraphStore();

  const xDataRange = range(
    graphStore.axisRange.x.min,
    graphStore.axisRange.x.max + 1,
    0.1
  ).toArray() as Array<number>;

  const yDataRange: Array<number> = xDataRange.map((x: number) =>
    calculateExpr(equationVisualizerStore.displayedFunc).evaluate({ x: x })
  );

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
