import { Flex } from "@chakra-ui/react";
import { ReactElement } from "react";
import { HomeAllLecturesView } from "./HomeAllLecturesView";
import { HomeAllToolsView } from "./HomeAllToolsView";
import { HomeHeader } from "./HomeHeader";

type Props = {
  allMajor: Array<string>;
  allTools: Array<string>;
};

export function HomeView({ allMajor, allTools }: Props): ReactElement {
  return (
    <Flex width="100%" flexDirection="column">
      <HomeHeader />
      <HomeAllLecturesView allMajor={allMajor} />
      <HomeAllToolsView allTools={allTools} />
    </Flex>
  );
}
