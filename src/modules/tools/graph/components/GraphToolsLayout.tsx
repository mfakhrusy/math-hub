import { Flex, useDisclosure } from "@chakra-ui/react";
import { PropsWithChildren, ReactElement } from "react";
import { GraphVariant, DataRange } from "../graphTools";
import { FloatingGraphConfig } from "./FloatingGraphConfig";
import { GraphField } from "./GraphField";
import { GraphSettingModal } from "./GraphSettingModal";

type Props = {
  dataRange: DataRange;
  graphVariant?: GraphVariant;
};

export function GraphToolsLayout({
  children,
  dataRange,
  graphVariant = "Line",
}: PropsWithChildren<Props>): ReactElement {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex flexDirection="column" backgroundColor="#EFEFEF" height="100vh">
      {children}
      <FloatingGraphConfig onClick={onOpen} />
      <GraphSettingModal onClose={onClose} isOpen={isOpen} />
      <GraphField dataRange={dataRange} graphVariant={graphVariant} />
    </Flex>
  );
}
