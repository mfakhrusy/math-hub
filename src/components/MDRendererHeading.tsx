import ReactMarkdown from "react-markdown";
import { Heading } from "@chakra-ui/react";
import { PropsWithChildren, ReactElement } from "react";

type Props = {
  level: number;
};

export function MDRendererHeading(props: PropsWithChildren<Props>): ReactElement {
  if (props.level === 1) {
    return <Heading size="xl">{props.children}</Heading>;
  }

  const Component = ReactMarkdown.renderers.heading;
  return <Component {...props} />;
}
