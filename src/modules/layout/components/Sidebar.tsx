import { useRouter } from "next/router";
import { Center, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { getLectureLevel, getParentLectureLevel } from "@/engine/lectures/lectures";
import { sentenceCase } from "@/lib/stringUtils";
import { Spacer } from "@/components/Spacer";
import { SidebarGoBackButton } from "./SidebarGoBackButton";

type Props = {
  siblingLectures: Array<string>
}

export function Sidebar({siblingLectures}: Props) {
  const router = useRouter();
  const query = router.query;
  const lectureLevel = getLectureLevel(query);
  const lectureName = query[lectureLevel ?? ''] as string | undefined;
  const parentLectureName = query[getParentLectureLevel(lectureLevel) ?? ''] as string | undefined;

  const onClickSiblingLecture = (lecture: string) => {
    switch (lectureLevel) {
      case 'major':
        return router.push(`/${lecture}`);
      case 'minor':
        return router.push(`/${query.major}/${lecture}`)
      case 'subject':
        return router.push(`/${query.major}/${query.minor}/${lecture}`)
      case 'chapter':
        return router.push(`/${query.major}/${query.minor}/${query.subject}/${lecture}`)
      default:
        return {}
    }
  };

  return (
    <Flex
      minWidth="300px"
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
      <SidebarGoBackButton />
      <Spacer height={4} />
      <Flex flexDirection="column" paddingX={4}>
        <Heading size="sm">
          {`Content of ${parentLectureName ? sentenceCase(parentLectureName) : 'All'}:`}
        </Heading>
        <Spacer height={4} />
        {siblingLectures.map((lecture, index) => (
          <Flex
            key={index}
            marginBottom={2}
            width="100%"
            cursor="pointer"
            _hover={{color: 'black'}}
            color='grey.450'
            fontWeight={lecture === lectureName ? '600' : '500'}
            onClick={() => onClickSiblingLecture(lecture)}
          >
            <Text>{sentenceCase(lecture)}</Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};
