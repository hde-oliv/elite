import { Box, Text, Flex, Link } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box width="100%">
      <Flex width="100%" flexDirection="column">
        <Text ml="auto" mr="auto">
          Made with <Link href="https://chakra-ui.com/">Chakra UI</Link> and{" "}
          <Link href="https://nextjs.org/">Next.js</Link>.
        </Text>
        <Text ml="auto" mr="auto" mb="1%">
          © 2021 Elite Fansub
        </Text>
      </Flex>
    </Box>
  );
}
