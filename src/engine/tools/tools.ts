import fs from "fs";

export function getAllTools(): Array<string> {
  const folders = fs
    .readdirSync?.(`${process.cwd()}/src/pages/tools`)
    .map((item) => `${item.replace(".tsx", "")}`);

  return folders;
}
