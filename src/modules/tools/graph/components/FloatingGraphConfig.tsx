import { Flex, Image } from "@chakra-ui/react";
import { ReactElement } from "react";

type Props = {
  onClick: () => void;
};

export function FloatingGraphConfig({ onClick }: Props): ReactElement {
  return (
    <Flex
      id="draggableSource"
      position="fixed"
      top="140px"
      left="10px"
      width="50px"
      height="50px"
      padding="7px"
      cursor="pointer"
      backgroundColor="#CACACA"
      opacity="0.7"
      borderRadius="8px"
      onClick={onClick}
    >
      <Image
        src="/assets/config-icon.svg"
        width="100%"
        height="100%"
        draggable="false"
      />
    </Flex>
  );
}
