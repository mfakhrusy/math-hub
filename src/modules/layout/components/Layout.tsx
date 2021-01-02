import { Flex } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { Sidebar } from "./Sidebar";

type Props = {
  sidebarItems: Array<string>
}

export function Layout({children, sidebarItems}: PropsWithChildren<Props>) {
  return (
    <Flex>
      <Sidebar items={sidebarItems} />
      <Flex
        as="main"
        fontFamily="Roboto"
        flexGrow={1}
        // width="100%"
      >
        {children}
      </Flex>
    </Flex>
  )
};
