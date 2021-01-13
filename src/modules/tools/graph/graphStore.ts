import createHooks from "zustand";

type Size = {
  width: number;
  height: number;
};

const defaultGraphFieldSize: Size = {
  width: 1000,
  height: 1000,
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
    min: -40,
    max: 40,
  },
  y: {
    min: -40,
    max: 40,
  },
};

type EquationVisualizerState = {
  graphFieldSize: Size;
  setGraphFieldSize: (size: Size) => void;
  axisRange: AxisRange;
  setXAxisRange: (xRange: Range) => void;
  setYAxisRange: (yRange: Range) => void;
};

export const useGraphStore = createHooks<EquationVisualizerState>((set) => ({
  graphFieldSize: defaultGraphFieldSize,
  setGraphFieldSize: (size) =>
    set((state) => ({ ...state, graphFieldSize: size })),
  axisRange: defaultAxisRange,
  setXAxisRange: (xRange: Range) =>
    set((state) => ({
      ...state,
      axisRange: { ...state.axisRange, x: xRange },
    })),
  setYAxisRange: (yRange: Range) =>
    set((state) => ({
      ...state,
      axisRange: { ...state.axisRange, y: yRange },
    })),
}));
