import { Spacer } from "@/components/Spacer";
import { Flex, Heading } from "@chakra-ui/react";
import { ReactElement } from "react";

export function PointPlotterHeader(): ReactElement {
  return (
    <Flex flexDirection="column" padding="20px">
      <Heading size="md">Point Plotter</Heading>
      <Spacer height="20px" />
    </Flex>
  );
}
