import { Box, LayoutProps } from "@chakra-ui/react";
import { ReactElement } from "react";

type Props = {
  width?: LayoutProps["width"];
  height?: LayoutProps["height"];
};

export function Spacer({ width = 0, height = 0 }: Props): ReactElement {
  return <Box width={width} height={height} />;
}
