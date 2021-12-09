import { Box, Button, Flex, Input, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box pl="5%" pr="5%" pt="1.5%" pb="1.5%">
      <Flex p="0%">
        <Flex flex="1" justifyContent="start" mr="auto">
            <Button>Elite Fansub</Button>
        </Flex>
        <Flex flex="5" justifyContent="center" alignSelf="center">
          <Input placeholder="Search" />
        </Flex>
        <Flex flex="1" justifyContent="end" ml="auto">
          <Button onClick={() => toggleColorMode()} ml="auto" mr="auto">
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
            <Button>Animes</Button>
        </Flex>
      </Flex>
    </Box>
  );
}
