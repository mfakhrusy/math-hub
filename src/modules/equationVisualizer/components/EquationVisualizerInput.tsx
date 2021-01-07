import { Spacer } from "@/components/Spacer";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useEquationVisualizerStore } from "../equationVisualizerStore";

export function EquationVisualizerInput() {
  const store = useEquationVisualizerStore();

  return (
    <Flex alignItems="center">
      <Flex flexDirection="column">
        <Text>Enter math expression:</Text>
        <Text as="small">(example: x^2 + 4*e^x)</Text>
      </Flex>
      <Spacer width="20px" />
      <Input
        width="250px"
        value={store.inputFunc}
        onChange={(e) => store.setInputFunc(e.target.value)}
        backgroundColor="white"
        onKeyPress={({ key }) => {
          if (key === "Enter") {
            store.setDisplayedFunc(store.inputFunc);
          }
        }}
      />
      <Spacer width="20px" />
      <Button
        colorScheme="blue"
        onClick={() => store.setDisplayedFunc(store.inputFunc)}
      >
        Visualize!
      </Button>
    </Flex>
  );
}
