import { Flex, useDisclosure } from "@chakra-ui/react";
import { ReactElement, ReactNode, useEffect, useRef } from "react";
import { useGraphStore } from "../graphStore";
import { GraphVariant, DataRange, ZoomType } from "../graphTools";
import { GraphField } from "./GraphField";

type Props = {
  dataRange: DataRange;
  graphVariant?: GraphVariant;
  children: ReactNode;
  zoom: ZoomType;
};

export function GraphToolsLayout({
  children,
  dataRange,
  graphVariant = "Line",
  zoom,
}: Props): ReactElement {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const store = useGraphStore();
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current?.clientHeight) {
      store.setHeaderHeight(headerRef.current.clientHeight);
    }
  }, [headerRef.current?.clientHeight]);

  return (
    <Flex flexDirection="column" backgroundColor="#EFEFEF" height="100vh">
      <>
        <Flex ref={headerRef}>{children}</Flex>
        {/* <FloatingGraphConfig onClick={onOpen} />
          <GraphSettingModal onClose={onClose} isOpen={isOpen} /> */}
        <GraphField
          dataRange={dataRange}
          graphVariant={graphVariant}
          zoom={zoom}
        />
      </>
    </Flex>
  );
}
