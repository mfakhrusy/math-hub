import { compile } from 'mathjs';
import dynamic from 'next/dynamic';
import { ReactMarkdown } from '@/components/ReactMarkdown';
import { Spacer } from '@/components/Spacer';
import { Flex, Heading, Input, Text } from '@chakra-ui/react';
import { scaleLinear } from '@visx/scale';
import { Bar, LinePath } from '@visx/shape';
import { curveNatural } from '@visx/curve';
import { range } from 'mathjs';

const Introduction = dynamic({
  loader: async () => {
    const md = await import('./newton-rhapson.md');

    return () => (
      <ReactMarkdown source={md.default} />
    );
  }
});

const xSet = range(-2, 2.1, 0.1).toArray() as Array<number>;

const baseFunc = 'x^2 - 4';

const expr = compile(baseFunc);

const ySet: Array<number> = xSet.map((x: number) => expr.evaluate({x: x}))

const xScale = scaleLinear<number>({
  domain: [-2, 3],
});

const yScale = scaleLinear<number>({
  domain: [-4, 4],
});

type Data = {
  x: number;
  y: number;
}

const data: Array<Data> = xSet.map((x: number, i) => ({
  x: x,
  y: ySet[i]
}));

const getX = (d: Data) => d.x;
const getY = (d: Data) => d.y;

export default function NewtonRhapson() {
  const width = 100;
  const height = 200;

  xScale.range([0, width - 50]);
  yScale.range([height - 2, 0]);


  console.log(data);

  return (
    <Flex width="100%" flexDirection="column">
      <Introduction />
      <Spacer height={5} />
      <Flex width="100%">
        <Flex width="50%" flexDirection="column">
          <Heading size="md">Enter math expression below!</Heading>
          <Text>{`example: ${baseFunc}`}</Text>
          <Spacer height={5} />
          <Input variant="flushed" />
        </Flex>
        <Flex width="50%" backgroundColor="white">
          <svg width="1000" height="1000">
            <LinePath
              height="100"
              curve={curveNatural}
              data={data}
              x={d => {console.log(d); return xScale(getX(d)) ?? 0}}
              y={d => yScale(getY(d)) ?? 0}
              stroke="#333"
              strokeWidth={2}
              strokeOpacity={1}
            />
          </svg>
        </Flex>
      </Flex>
    </Flex>
  )
};
