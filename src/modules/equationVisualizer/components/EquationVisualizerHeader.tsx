import { Spacer } from "@/components/Spacer";
import { Flex, Heading } from "@chakra-ui/react";
import { ReactElement } from "react";
import { EquationVisualizerInput } from "./EquationVisualizerInput";

export function EquationVisualizerHeader(): ReactElement {
  return (
    <Flex flexDirection="column" padding={{ base: "10px", sm: "20px" }}>
      <Heading size="md">Math Equation Visualizer</Heading>
      <Spacer height="20px" />
      <EquationVisualizerInput />
    </Flex>
  );
}
