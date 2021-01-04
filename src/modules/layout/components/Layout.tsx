import { Flex } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { Sidebar } from "./Sidebar";

type Props = {
  siblingLectures: Array<string>
}

export function Layout({children, siblingLectures}: PropsWithChildren<Props>) {
  return (
    <Flex>
      <Sidebar siblingLectures={siblingLectures} />
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
