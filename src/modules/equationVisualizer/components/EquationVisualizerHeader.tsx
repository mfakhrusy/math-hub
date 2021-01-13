import { Spacer } from "@/components/Spacer";
import { Flex, Heading } from "@chakra-ui/react";
import { EquationVisualizerInput } from "./EquationVisualizerInput";

export function EquationVisualizerHeader() {
  return (
    <Flex flexDirection="column" padding="20px">
      <Heading size="md">Math Equation Visualizer</Heading>
      <Spacer height="20px" />
      <EquationVisualizerInput />
    </Flex>
  );
}
