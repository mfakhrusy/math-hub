import { Flex } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { LecturesSidebar } from "./LecturesSidebar";

type Props = {
  siblingLectures: Array<string>;
};

export function LecturesLayout({
  children,
  siblingLectures,
}: PropsWithChildren<Props>) {
  return (
    <Flex>
      <LecturesSidebar siblingLectures={siblingLectures} />
      <Flex
        as="main"
        fontFamily="Roboto"
        flexGrow={1}
        backgroundColor="grey.50"
        color="grey.450"
      >
        {children}
      </Flex>
    </Flex>
  );
}
