import { compile, derivative } from 'mathjs';
import dynamic from 'next/dynamic';
import { ReactMarkdown } from '@/components/ReactMarkdown';
import { Spacer } from '@/components/Spacer';
import { Flex, Heading, Input, Text } from '@chakra-ui/react';
// import Shape from '@visx/shape';
// import { curveCatmullRomOpen } from '@visx/curve';
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

const xSet = range(-1, 1.1, 0.1).toArray() as Array<number>;

const baseFunc = 'x^4 + 4x';

const expr = compile(baseFunc);

const ySet: Array<number> = xSet.map((x: number) => expr.evaluate({x: x}))
// const width = 500;
// const height = 200;

const xDataSet = scaleLinear<number>({
  domain: [-50, 50],
});

const yDataSet = scaleLinear<number>({
  domain: [-150, 200],
});

type Data = {
  x: number;
  y: number;
}

const data: Array<Data> = xSet.map((x: number, i) => ({
  x: x * 50,
  y: ySet[i] * 50
}));

const getX = (d: Data) => d.x;
const getY = (d: Data) => d.y;

// const data = [
//   {
//     y: -0.5
//   },
//   {
//     y: 0,
//   },
//   {
//     y: 0.2,
//   },
//   {
//     y: 0.4
//   },
// ];

// const points = data.map((d, i) => {
//   const barHeight = 1 - yDataSet(d.y);
//   return <Bar height={barHeight} y={1 - barHeight} />
// })

export default function NewtonRhapson() {
  const width = 1000;
  const height = 500;

  xScale.range


  console.log(data);

  return (
    <Flex width="100%" flexDirection="column">
      <Introduction />
      <Spacer height={5} />
      <Flex width="100%">
        <Flex width="50%" flexDirection="column">
          <Heading size="md">Enter math expression below!</Heading>
          <Text>example: x^2 + 3x</Text>
          <Spacer height={5} />
          <Input variant="flushed" />
        </Flex>
        <Flex width="50%" backgroundColor="white">
          <svg width="1000" height="1000">
            <LinePath
              height="100"
              curve={curveNatural}
              data={data}
              x={d => {console.log(d); return xDataSet(getX(d)) ?? 0}}
              y={d => yDataSet(getY(d)) ?? 0}
              stroke="#333"
              strokeWidth={2}
              strokeOpacity={1}
            />

          </svg>
          {/* <Shape.LinePath curve={curveCatmullRomOpen} /> */}
          {/* {points} */}
        </Flex>
      </Flex>
    </Flex>
  )
};
