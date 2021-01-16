import { Spacer } from "@/components/Spacer";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { ReactElement } from "react";
import {
  defaultFunc,
  useEquationVisualizerStore,
} from "../equationVisualizerStore";

export function EquationVisualizerInput(): ReactElement {
  const store = useEquationVisualizerStore();

  return (
    <Flex alignItems="center">
      <Flex flexDirection="column">
        <Text>Enter math expression:</Text>
        <Text as="small">{`(example: ${defaultFunc})`}</Text>
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
