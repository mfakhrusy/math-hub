import { Center, Flex, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Spacer } from "@/components/Spacer";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { LectureURLQuery } from "@/types/lectures";
import { getLectureLevel } from "@/engine/lectures/lectures";

type Props = {
  items: Array<string>
}

export function Sidebar({items}: Props) {
  const router = useRouter();

  const goBack = (query: LectureURLQuery) => {
    let lectureLevel = getLectureLevel(query);

    switch (lectureLevel) {
      case 'major':
        return router.push("/");
      case 'minor':
        return router.push(`/${query.major}`)
      case 'subject':
        return router.push(`/${query.major}/${query.minor}`)
      case 'chapter':
        return router.push(`/${query.major}/${query.minor}/${query.subject}`)
      default:
        return {}
    }
  };

  return (
    <Flex
      position="absolute"
      width="300px"
      backgroundColor="primary.100"
      height="100vh"
      flexDirection="column"
    >
      <Center
        height="150px"
        width="100%"
        cursor="pointer"
        onClick={() => router.push("/")}
      >
        <Image src="/assets/mathematic-hub-logo.png" width="140px" height="140px" />
      </Center>
      <Spacer height={2} />
      <Flex onClick={() => goBack(router.query)} alignItems="center" cursor="pointer">
        <ChevronLeftIcon width="24px" height="24px" />
        <Text>Go Back</Text>
      </Flex>
      <Flex flexDirection="column">
        {items.map((item) => (
          <Flex>
            <Text>{item}</Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};
