import { Box, Button, Flex, Input } from "@chakra-ui/react";

export default function NavBar() {
  return (
    <Box pl="7%" pr="7%" pt="1.5%" pb="1.5%">
      <Flex p="0%">
        <Flex flex="1" justifyContent="start" mr="auto">
            <Button>Elite Fansub</Button>
        </Flex>
        <Flex flex="5" justifyContent="center" alignSelf="center">
          <Input placeholder="Search" />
        </Flex>
        <Flex flex="1" justifyContent="end" ml="auto">
            <Button>Animes</Button>
        </Flex>
      </Flex>
    </Box>
  );
}
