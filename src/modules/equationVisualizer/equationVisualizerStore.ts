import createHooks from "zustand";

export const defaultFunc = "0.5x^2 * sin(x/5)";

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
