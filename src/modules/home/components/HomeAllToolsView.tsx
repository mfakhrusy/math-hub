import Link from "next/link";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { Spacer } from "@/components/Spacer";
import { sentenceCase } from "@/lib/stringUtils";

type Props = {
  allTools: Array<string>;
};

export function HomeAllToolsView({ allTools }: Props) {
  return (
    <Flex
      width="100%"
      marginTop="50px"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Heading size="lg">All Tools</Heading>
      <Spacer height="25px" />
      <Flex>
        {allTools.map((tool) => (
          <Link href={`/tools/${tool}`}>
            <Flex
              width="400px"
              height="100px"
              alignItems="center"
              justifyContent="center"
              transition="0.3s cubic-bezier(0.5, 1, 0.89, 1)"
              cursor="pointer"
              marginRight="15px"
              _hover={{
                transition: "0.3s cubic-bezier(0.5, 1, 0.89, 1)",
                boxShadow: "1px 1px 5px -2px rgba(0,0,0,0.75)",
              }}
            >
              <Text fontWeight="600" fontSize="20px">
                {sentenceCase(tool)}
              </Text>
            </Flex>
          </Link>
        ))}
      </Flex>
    </Flex>
  );
}
