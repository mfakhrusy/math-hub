import { ProvidedZoom, TransformMatrix } from "@visx/zoom/lib/types";

export type GraphVariant = "Line" | "Scatter";
export type GraphData = {
  x: number;
  y: number;
};

export type DataRange = Array<GraphData>;

export const getX = (d: GraphData): number => d.x;
export const getY = (d: GraphData): number => d.y;

export interface ZoomType extends ProvidedZoom {
  transformMatrix: TransformMatrix;
  isDragging: boolean;
}

