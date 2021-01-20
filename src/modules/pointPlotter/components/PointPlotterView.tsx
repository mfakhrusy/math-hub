import { range } from "mathjs";
import { DataRange, GraphToolsLayout } from "@/modules/tools/graph";
import { useGraphStore } from "@/modules/tools/graph/graphStore";
import { PointPlotterHeader } from "./PointPlotterHeader";
import { withZoom } from "@/modules/tools/graph/lib/withZoom";
import { ZoomType } from "@/modules/tools/graph/graphTools";

type Props = {
  zoom: ZoomType;
};

function PointPlotterViewWrapped({ zoom }: Props): JSX.Element {
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
    <GraphToolsLayout dataRange={dataRange} graphVariant="Scatter" zoom={zoom}>
      <PointPlotterHeader />
    </GraphToolsLayout>
  );
}

export const PointPlotterView = withZoom(PointPlotterViewWrapped);
