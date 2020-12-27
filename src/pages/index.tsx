import { Center, Container, Text } from "@chakra-ui/react";

export default function Index() {
  return (
    <Center>
      <Container
        display="flex"
        maxWidth="800px"
        height="250px"
        alignItems="center"
        justifyContent="center"
        centerContent
      >
        <Text>Welcome to math-hub</Text>
      </Container>
    </Center>
  )
};
