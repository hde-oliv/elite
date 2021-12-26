import { Box, Text, Flex, Link } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box bg="gray.900" width="99vw">
      <Flex width="100%" flexDirection="column">
        <Text color="white" ml="auto" mr="auto" mt="2%">
          Made with <Link href="https://chakra-ui.com/">Chakra UI</Link> and <Link href="https://nextjs.org/">Next.js</Link>.
        </Text>
        <Text color="white" ml="auto" mr="auto" mb="1%">
           © 2021 Elite Fansub
        </Text>
      </Flex>
    </Box>
  );
}
