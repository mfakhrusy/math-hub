import createHooks from "zustand";

const baseFunc = "x^2 + 4*e^x";

type EquationVisualizerState = {
  inputFunc: string;
  displayedFunc: string;
  setInputFunc: (func: string) => void;
  setDisplayedFunc: (func: string) => void;
};

export const useEquationVisualizerStore = createHooks<EquationVisualizerState>(
  (set) => ({
    inputFunc: baseFunc,
    displayedFunc: baseFunc,
    setInputFunc: (func) => set((state) => ({ ...state, inputFunc: func })),
    setDisplayedFunc: (func) =>
      set((state) => ({ ...state, displayedFunc: func })),
  })
);
