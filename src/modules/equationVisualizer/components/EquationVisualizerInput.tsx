import { Spacer } from "@/components/Spacer";
import { Button, Flex, HStack, Input, Text } from "@chakra-ui/react";
import { ReactElement } from "react";
import {
  defaultFunc,
  useEquationVisualizerStore,
} from "../equationVisualizerStore";

export function EquationVisualizerInput(): ReactElement {
  const store = useEquationVisualizerStore();

  return (
    <Flex alignItems="center" flexDirection={{ base: "column", sm: "row" }}>
      <Flex flexDirection="column" width="100%">
        <Text>Enter math expression:</Text>
        <Text as="small">{`(example: ${defaultFunc})`}</Text>
      </Flex>
      <Spacer
        width={{ base: "0", sm: "20px" }}
        height={{ base: "10px", sm: "0" }}
      />
      <HStack>
        <Input
          width="200px"
          value={store.inputFunc}
          onChange={(e) => store.setInputFunc(e.target.value)}
          backgroundColor="white"
          onKeyPress={({ key }) => {
            if (key === "Enter") {
              store.setDisplayedFunc(store.inputFunc);
            }
          }}
        />
        <Spacer width={{ base: "10px", sm: "20px" }} />
        <Button
          colorScheme="blue"
          onClick={() => store.setDisplayedFunc(store.inputFunc)}
        >
          Visualize!
        </Button>
      </HStack>
    </Flex>
  );
}
