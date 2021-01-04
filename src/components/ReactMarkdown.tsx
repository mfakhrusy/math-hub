import ReactMardown_ from 'react-markdown';
import { MDHeadingRenderer } from './MDHeadingRenderer';

type Props = {
  source: string;
}

export function ReactMarkdown({source}: Props) {
  return (
    <ReactMardown_
      source={source}
      renderers={{
        heading: MDHeadingRenderer
      }}
    />
  )
}