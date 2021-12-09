import { Image, Center, Text, Flex } from "@chakra-ui/react";

export default function Clown() {
  return (
    <Flex flexDirection="column">
      <Image src={`./clown.svg`} height="90vh" mt="1%" alt={'clown'} />
      <Center>
        <Text as="b" mt="1%">Not implemented, go back!</Text>
      </Center>
    </Flex>
  );
}
