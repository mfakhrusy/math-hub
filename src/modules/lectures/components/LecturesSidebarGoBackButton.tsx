import { getLectureLevel } from "@/engine/lectures/lectures";
import { LectureURLQuery } from "@/types/lectures";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactElement } from "react";

export function LecturesSidebarGoBackButton(): ReactElement {
  const router = useRouter();
  const lectureLevel = getLectureLevel(router.query);

  const goBack = (query: LectureURLQuery) => {
    switch (lectureLevel) {
      case "major":
        return router.push("/");
      case "minor":
        return router.push(`/${query.major}`);
      case "subject":
        return router.push(`/${query.major}/${query.minor}`);
      case "chapter":
        return router.push(`/${query.major}/${query.minor}/${query.subject}`);
      default:
        return {};
    }
  };
  return (
    <Flex
      onClick={() => goBack(router.query)}
      alignItems="center"
      cursor="pointer"
    >
      <ChevronLeftIcon width="24px" height="24px" />
      <Text>Go Back</Text>
    </Flex>
  );
}
