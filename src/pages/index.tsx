import dynamic from 'next/dynamic';

interface Props {
  firstNumber: number;
  lastNumber: number;
}

const Add = dynamic<Props>({
  loader: async () => {
    const response = await import('../wasm/build/add.wasm');

    return ({firstNumber, lastNumber}) => (
      <div>{response.add(firstNumber, lastNumber)}</div>
    )
  }
})

export default function Index() {
  return <Add firstNumber={1} lastNumber={300} />;
}
