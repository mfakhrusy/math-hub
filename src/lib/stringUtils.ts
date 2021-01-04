import { camelCase, startCase } from "lodash"

export const sentenceCase = (str: string) => {
  return startCase(camelCase(str));
}