import { Flex, useDisclosure } from "@chakra-ui/react";
import { Zoom } from "@visx/zoom";
import {
  PropsWithChildren,
  ReactElement,
  RefObject,
  useEffect,
  useRef,
} from "react";
import { useGraphStore } from "../graphStore";
import { GraphVariant, DataRange } from "../graphTools";
import { FloatingGraphConfig } from "./FloatingGraphConfig";
import { GraphField } from "./GraphField";
import { GraphSettingModal } from "./GraphSettingModal";

type Props = {
  dataRange: DataRange;
  graphVariant?: GraphVariant;
  zoomRef?: RefObject<Zoom> | null;
};

export function GraphToolsLayout({
  children,
  dataRange,
  graphVariant = "Line",
  zoomRef,
}: PropsWithChildren<Props>): ReactElement {
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
      <Flex ref={headerRef}>{children}</Flex>
      {/* <FloatingGraphConfig onClick={onOpen} />
      <GraphSettingModal onClose={onClose} isOpen={isOpen} /> */}
      <GraphField
        dataRange={dataRange}
        graphVariant={graphVariant}
        zoomRef={zoomRef}
      />
    </Flex>
  );
}
