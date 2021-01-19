import { TransformMatrix } from "@visx/zoom/lib/types";
import createHooks from "zustand";

type Size = {
  width: number;
  height: number;
};

const initialGraphFieldSize: Size = {
  width: 0,
  height: 0,
};

type Range = {
  min: number;
  max: number;
};

type AxisRange = {
  x: Range;
  y: Range;
};

const initialAxisRange: AxisRange = {
  x: {
    min: -10,
    max: 10,
  },
  y: {
    min: -10,
    max: 10,
  },
};

export const initialTransformMatrix: TransformMatrix = {
  scaleX: 1,
  scaleY: 1,
  translateX: 0,
  translateY: 0,
  skewX: 0,
  skewY: 0,
};

type EquationVisualizerState = {
  graphFieldSize: Size;
  setGraphFieldSize: (size: Size) => void;
  axisRange: AxisRange;
  setAxisRange: (range: AxisRange) => void;
  isWidthBiggerThanHeight: boolean;
  setIsWidthBiggerThanHeight: (b: boolean) => void;
  headerHeight: number;
  setHeaderHeight: (height: number) => void;
  transformMatrix: TransformMatrix;
  setTransformMatrix: (matrix: TransformMatrix) => void;
};

export const useGraphStore = createHooks<EquationVisualizerState>((set) => ({
  graphFieldSize: initialGraphFieldSize,
  setGraphFieldSize: (size) =>
    set((state) => ({ ...state, graphFieldSize: size })),
  axisRange: initialAxisRange,
  setAxisRange: ({ x, y }) =>
    set((state) => ({
      ...state,
      axisRange: { x, y },
    })),
  isWidthBiggerThanHeight: true,
  setIsWidthBiggerThanHeight: (bool: boolean) =>
    set((state) => ({
      ...state,
      isWidthBiggerThanHeight: bool,
    })),
  headerHeight: 0,
  setHeaderHeight: (height: number) =>
    set((state) => ({
      ...state,
      headerHeight: height,
    })),
  transformMatrix: initialTransformMatrix,
  setTransformMatrix: (matrix: TransformMatrix) => set((state) => ({
    ...state,
    transformMatrix: matrix,
  }))
}));
