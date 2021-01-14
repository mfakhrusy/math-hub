import { Spacer } from "@/components/Spacer";
import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { ReactElement, useState } from "react";
import { useGraphStore } from "../graphStore";

type InputFieldProps = {
  label: string;
  value: string;
  onConfirm: (value: string) => void;
};

function InputField({ label, onConfirm, value }: InputFieldProps) {
  const [inputValue, setInputValue] = useState<string>(value);

  return (
    <Flex alignItems="center">
      <Text minWidth="43px">{label}</Text>
      <Spacer width="10px" />
      <Input
        value={inputValue ?? value}
        onChange={(e) => setInputValue(e.target.value)}
        width="80px"
        backgroundColor="white"
        onKeyPress={({ key }) => {
          if (key === "Enter") {
            onConfirm(inputValue);
          }
        }}
      />
      <Spacer width="10px" />
      <Button onClick={() => onConfirm(inputValue)} colorScheme="blue">
        Set
      </Button>
    </Flex>
  );
}

export function GraphRangeSetting(): ReactElement {
  const store = useGraphStore();

  return (
    <Flex flex="1" paddingTop="10px" flexDirection="column">
      <Heading size="md">Visualizer Range</Heading>
      <Spacer height="20px" />
      <Flex>
        <Flex width="40%" flexDirection="column">
          <InputField
            label="min x"
            value={store.axisRange.x.min.toString()}
            onConfirm={(value) =>
              store.setXAxisRange({
                max: store.axisRange.x.max,
                min: Number(value),
              })
            }
          />
          <Spacer height="15px" />
          <InputField
            label="max x"
            value={store.axisRange.x.max.toString()}
            onConfirm={(value) =>
              store.setXAxisRange({
                max: Number(value),
                min: store.axisRange.x.min,
              })
            }
          />
        </Flex>
        <Flex width="40%" flexDirection="column">
          <InputField
            label="min y"
            value={store.axisRange.y.min.toString()}
            onConfirm={(value) =>
              store.setYAxisRange({
                max: store.axisRange.y.max,
                min: Number(value),
              })
            }
          />
          <Spacer height="15px" />
          <InputField
            label="max y"
            value={store.axisRange.y.max.toString()}
            onConfirm={(value) =>
              store.setYAxisRange({
                max: Number(value),
                min: store.axisRange.y.min,
              })
            }
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
