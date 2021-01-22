import createHooks from "zustand";

export const defaultFunc = "sin(x)";

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
