import { ReactElement } from "react";
import ReactMardown_ from "react-markdown";
import { MDRendererHeading } from "./MDRendererHeading";

type Props = {
  source: string;
};

export function ReactMarkdown({ source }: Props): ReactElement {
  return (
    <ReactMardown_
      source={source}
      renderers={{
        heading: MDRendererHeading,
      }}
    />
  );
}
