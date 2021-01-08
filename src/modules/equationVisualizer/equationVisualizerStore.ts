import createHooks from "zustand";

const defaultFunc = "x^2 - 10";

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
  inputFunc: string;
  setInputFunc: (func: string) => void;
  displayedFunc: string;
  setDisplayedFunc: (func: string) => void;
  graphFieldSize: Size;
  setGraphFieldSize: (size: Size) => void;
  axisRange: AxisRange;
  setXAxisRange: (xRange: Range) => void;
  setYAxisRange: (yRange: Range) => void;
};

export const useEquationVisualizerStore = createHooks<EquationVisualizerState>(
  (set) => ({
    inputFunc: defaultFunc,
    displayedFunc: defaultFunc,
    setInputFunc: (func) => set((state) => ({ ...state, inputFunc: func })),
    setDisplayedFunc: (func) =>
      set((state) => ({ ...state, displayedFunc: func })),
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
  })
);
