import { Spacer } from "@/components/Spacer";
import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { curveNatural } from "@visx/curve";
import { scaleLinear } from "@visx/scale";
import { LinePath } from "@visx/shape";
import { compile, range } from "mathjs";
import { useState } from "react";

type Data = {
  x: number;
  y: number;
};

const xSet = range(-2, 2.1, 0.1).toArray() as Array<number>;

const baseFunc = "x^2 + 4*e^x";

const calculateExpr = (func: string) => compile(func);

const getX = (d: Data) => d.x;
const getY = (d: Data) => d.y;

export function EquationVisualizerView() {
  const [inputFunc, setInputFunc] = useState<string>(baseFunc);
  const [func, setFunc] = useState<string>(baseFunc);
  const width = 1000;
  const height = 1000;

  const ySet: Array<number> = xSet.map((x: number) =>
    calculateExpr(func).evaluate({ x: x })
  );

  const xScale = scaleLinear<number>({
    domain: [-2, 3],
  });

  const yScale = scaleLinear<number>({
    domain: [-4, 4],
  });

  const data: Array<Data> = xSet.map((x: number, i) => ({
    x: x,
    y: ySet[i],
  }));

  xScale.range([0, width]);
  yScale.range([height, 0]);

  return (
    <Flex flexDirection="column" backgroundColor="#EFEFEF" height="100vh">
      <Flex flexDirection="column" padding="20px">
        <Heading size="md">Math Equation Visualizer</Heading>
        <Spacer height="20px" />
        <Flex alignItems="center">
          <Flex flexDirection="column">
            <Text>Enter math expression:</Text>
            <Text as="small">(example: x^2 + 4*e^x)</Text>
          </Flex>
          <Spacer width="20px" />
          <Input width="250px" value={inputFunc} onChange={(e) => setInputFunc(e.target.value)} backgroundColor="white"/>
          <Spacer width="20px" />
          <Button colorScheme="blue" onClick={() => setFunc(inputFunc)}>Visualize!</Button>
        </Flex>
      </Flex>
        <Flex width="100%" backgroundColor="white" height="100%">
          <svg width="100%" height="100%">
            <LinePath<Data>
              // height="300"
              curve={curveNatural}
              // transform="translate(50, 80)"
              data={data}
              x={(d) => xScale(getX(d)) ?? 0}
              y={(d) => yScale(getY(d)) ?? 0}
              stroke="#333333"
              strokeWidth={2}
              strokeOpacity={1}
            />
          </svg>
        </Flex>
    </Flex>
  )
};
