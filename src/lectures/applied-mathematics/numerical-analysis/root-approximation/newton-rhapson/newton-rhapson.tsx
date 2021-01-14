import { compile } from "mathjs";
import dynamic from "next/dynamic";
import { ReactMarkdown } from "@/components/ReactMarkdown";
import { Spacer } from "@/components/Spacer";
import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { scaleLinear } from "@visx/scale";
import { LinePath } from "@visx/shape";
import { curveNatural } from "@visx/curve";
import { range } from "mathjs";
import { ReactElement, useState } from "react";

const Introduction = dynamic({
  loader: async () => {
    const md = await import("./newton-rhapson.md");

    return () => <ReactMarkdown source={md.default} />;
  },
});

type Data = {
  x: number;
  y: number;
};

const xSet = range(-2, 2.1, 0.1).toArray() as Array<number>;

const baseFunc = "x - 4";

const calculateExpr = (func: string) => compile(func);

const getX = (d: Data) => d.x;
const getY = (d: Data) => d.y;

export default function NewtonRhapson(): ReactElement {
  const [inputFunc, setInputFunc] = useState<string>(baseFunc);
  const [func, setFunc] = useState<string>(baseFunc);
  const width = 200;
  const height = 400;

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

  xScale.range([0, width - 50]);
  yScale.range([height - 2, 0]);

  return (
    <Flex width="100%" flexDirection="column">
      <Introduction />
      <Spacer height={5} />
      <Flex width="100%">
        <Flex width="50%" flexDirection="column">
          <Heading size="md">Enter math expression below!</Heading>
          <Text>{`example: ${baseFunc}`}</Text>
          <Spacer height={5} />
          <Flex>
            <Input
              value={inputFunc}
              onChange={(e) => setInputFunc(e.target.value)}
              variant="flushed"
              width="200px"
            />
            <Spacer width={5} />
            <Button onClick={() => setFunc(inputFunc)}>Ok!</Button>
          </Flex>
        </Flex>
        <Flex width="50%" backgroundColor="white">
          <svg width="1000" height="500">
            <LinePath
              height="100"
              curve={curveNatural}
              data={data}
              x={(d) => xScale(getX(d)) ?? 0}
              y={(d) => yScale(getY(d)) ?? 0}
              stroke="#333"
              strokeWidth={2}
              strokeOpacity={1}
            />
          </svg>
        </Flex>
      </Flex>
    </Flex>
  );
}
