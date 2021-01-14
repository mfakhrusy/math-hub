import { Flex, Image } from "@chakra-ui/react";
import { ReactElement } from "react";

export function HomeHeader(): ReactElement {
  return (
    <Flex
      display="flex"
      height="250px"
      alignItems="center"
      justifyContent="center"
      borderBottom="1px solid #CCCCCC"
      width="100%"
    >
      <Image src="/assets/mathematic-hub-logo.png" />
    </Flex>
  );
}
