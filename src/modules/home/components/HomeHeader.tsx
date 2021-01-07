import { Flex, Image } from "@chakra-ui/react";

export function HomeHeader() {
  return (
    <Flex
      display="flex"
      height="250px"
      alignItems="center"
      justifyContent="center"
      borderBottom="1px solid #CCCCCC"
      width="100%"
      centerContent
    >
      <Image src="/assets/mathematic-hub-logo.png" />
    </Flex>
  );
}
