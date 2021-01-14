import { camelCase, startCase } from "lodash";

export const sentenceCase = (str: string): string => {
  return startCase(camelCase(str));
};
