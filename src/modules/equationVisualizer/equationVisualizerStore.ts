import createHooks from "zustand";

const defaultFunc = "x";

type Size = {
  width: number;
  height: number;
};
const defaultGraphFieldSize: Size = {
  width: 1000,
  height: 1000,
};

type EquationVisualizerState = {
  inputFunc: string;
  setInputFunc: (func: string) => void;
  displayedFunc: string;
  setDisplayedFunc: (func: string) => void;
  graphFieldSize: Size;
  setGraphFieldSize: (size: Size) => void;
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
  })
);
