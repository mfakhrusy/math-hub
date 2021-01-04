import { derivative } from 'mathjs';
import dynamic from 'next/dynamic';
import { ReactMarkdown } from '@/components/ReactMarkdown';

const Component = dynamic({
  loader: async () => {
    const md = await import('./newton-rhapson.md');

    return () => (
      <ReactMarkdown source={md.default} />
    )
  }
})

export default function NewtonRhapson() {
  return (
    <div>
      <Component />
      {derivative('x^4 + 4x', 'x').toString()}
    </div>
  )
};
