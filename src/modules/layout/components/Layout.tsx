import { Flex } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export function Layout({children}: PropsWithChildren<{}>) {
  return (
    <Flex as="main" fontFamily="Roboto">
      {children}
    </Flex>
  )
}