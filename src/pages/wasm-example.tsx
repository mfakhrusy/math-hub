import dynamic from 'next/dynamic';
import wasmModule from '../wasm/build/bind';

interface Props {
  firstNumber: number;
  lastNumber: number;
}

const Add = dynamic<Props>({
  loader: async () => {
    const wasm = await wasmModule();

    return ({firstNumber, lastNumber}) => {

      return (
      <div>{`lerp: ${wasm.lerp(3, 4, 4)}; multiply: ${wasm.multiply(firstNumber, lastNumber)}`}</div>
    )}
  },
  ssr: false
});

export default function Index() {
  return <Add firstNumber={1} lastNumber={300} />;
}
