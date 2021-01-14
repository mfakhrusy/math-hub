import { Divider, Flex, useDisclosure } from "@chakra-ui/react";
import { PropsWithChildren, ReactElement } from "react";
import { FloatingGraphConfig } from "./FloatingGraphConfig";
import { DataRange, GraphField } from "./GraphField";
import { GraphSettingModal } from "./GraphSettingModal";

type Props = {
  dataRange: DataRange;
};

export function GraphToolsLayout({
  children,
  dataRange,
}: PropsWithChildren<Props>): ReactElement {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex flexDirection="column" backgroundColor="#EFEFEF" height="100vh">
      <Flex>
        {children}
        <Divider orientation="vertical" backgroundColor="#AEAEAE" width="2px" />
      </Flex>
      <FloatingGraphConfig onClick={onOpen} />
      <GraphSettingModal onClose={onClose} isOpen={isOpen} />
      <GraphField dataRange={dataRange} />
    </Flex>
  );
}
