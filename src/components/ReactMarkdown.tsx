import ReactMardown_ from "react-markdown";
import { MDRendererHeading } from "./MDRendererHeading";

type Props = {
  source: string;
};

export function ReactMarkdown({ source }: Props) {
  return (
    <ReactMardown_
      source={source}
      renderers={{
        heading: MDRendererHeading,
      }}
    />
  );
}
