import createHooks from "zustand";

type Size = {
  width: number;
  height: number;
};

const defaultGraphFieldSize: Size = {
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

const defaultAxisRange: AxisRange = {
  x: {
    min: -10,
    max: 10,
  },
  y: {
    min: -10,
    max: 10,
  },
};

type EquationVisualizerState = {
  graphFieldSize: Size;
  setGraphFieldSize: (size: Size) => void;
  axisRange: AxisRange;
  setXAxisRange: (range: AxisRange) => void;
  setYAxisRange: (range: AxisRange) => void;
  isWidthBiggerThanHeight: boolean;
  setIsWidthBiggerThanHeight: (b: boolean) => void;
  headerHeight: number;
  setHeaderHeight: (height: number) => void;
};

export const useGraphStore = createHooks<EquationVisualizerState>((set) => ({
  graphFieldSize: defaultGraphFieldSize,
  setGraphFieldSize: (size) =>
    set((state) => ({ ...state, graphFieldSize: size })),
  axisRange: defaultAxisRange,
  setXAxisRange: ({ x, y }) =>
    set((state) => ({
      ...state,
      axisRange: { x, y },
    })),
  setYAxisRange: ({ x, y }) =>
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
}));
