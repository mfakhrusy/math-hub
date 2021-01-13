import createHooks from "zustand";

const defaultFunc = "x^2 - 10";

type EquationVisualizerState = {
  inputFunc: string;
  setInputFunc: (func: string) => void;
  displayedFunc: string;
  setDisplayedFunc: (func: string) => void;
};

export const useEquationVisualizerStore = createHooks<EquationVisualizerState>(
  (set) => ({
    inputFunc: defaultFunc,
    displayedFunc: defaultFunc,
    setInputFunc: (func) => set((state) => ({ ...state, inputFunc: func })),
    setDisplayedFunc: (func) =>
      set((state) => ({ ...state, displayedFunc: func })),
  })
);
