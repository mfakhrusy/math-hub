import { Spacer } from "@/components/Spacer";
import { Divider, Flex, Heading } from "@chakra-ui/react";
import { EquationVisualizerGraphField } from "./EquationVisualizerGraphField";
import { EquationVisualizerInput } from "./EquationVisualizerInput";
import { EquationVisualizerRangeInput } from "./EquationVisualizerRangeInput";

export function EquationVisualizerView() {
  return (
    <Flex flexDirection="column" backgroundColor="#EFEFEF" height="100vh">
      <Flex>
        <Flex flexDirection="column" padding="20px">
          <Heading size="md">Math Equation Visualizer</Heading>
          <Spacer height="20px" />
          <EquationVisualizerInput />
        </Flex>
        <Divider orientation="vertical" backgroundColor="#AEAEAE" width="2px" />
        <EquationVisualizerRangeInput />
      </Flex>
      <EquationVisualizerGraphField />
    </Flex>
  );
}
