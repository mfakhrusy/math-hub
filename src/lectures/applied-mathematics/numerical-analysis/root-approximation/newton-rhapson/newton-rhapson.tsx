import { derivative } from 'mathjs';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import { MDHeadingRenderer } from '@/components/MDHeadingRenderer';

const Component = dynamic({
  loader: async () => {
    const md = await import('./newton-rhapson.md');

    return () => (
      <ReactMarkdown source={md.default} renderers={{heading: MDHeadingRenderer}} />
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
