import { range } from "mathjs";
import { DataRange, GraphToolsLayout } from "@/modules/tools/graph";
import { useGraphStore } from "@/modules/tools/graph/graphStore";
import { PointPlotterHeader } from "./PointPlotterHeader";

export function PointPlotterView(): JSX.Element {
  const graphStore = useGraphStore();

  const xDataRange = range(
    graphStore.axisRange.x.min,
    graphStore.axisRange.x.max + 1,
    1
  ).toArray() as Array<number>;

  const yDataRange = xDataRange;

  const dataRange: DataRange = xDataRange.map((x: number, i) => ({
    x: x,
    y: yDataRange[i],
  }));

  return (
    <GraphToolsLayout dataRange={dataRange} graphVariant="Scatter">
      <PointPlotterHeader />
    </GraphToolsLayout>
  );
}
