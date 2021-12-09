import { Box, Button, Flex, IconButton, Input, useColorMode, Icon, Text, Image, Heading } from "@chakra-ui/react";
import { MoonIcon, SunIcon, LinkIcon } from "@chakra-ui/icons";
import MenuDrawer from "./MenuDrawer";
import { SiDiscord, SiFacebook, SiGithub } from 'react-icons/si';

export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const links = {
    discord: "/clown",
    facebook: "/clown",
    github: "/clown",
  }

  return (
    <Box pl="5%" pr="5%" pt="1.5%" pb="1.5%">
      <Flex p="0%">
        <Flex flex="1" justifyContent="start" mr="auto">
            <Heading>elite fansub</Heading>
        </Flex>
        <Flex flex="3" justifyContent="center" alignSelf="center">
          <Input placeholder="Pesquisar" />
        </Flex>
        <Flex flex="1" justifyContent="end" ml="auto">
          <Button onClick={() => toggleColorMode()} mr="2%">
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
          <IconButton onClick={() => window.open(links.discord, "_blank")} icon={<Icon as={SiDiscord} />}  mr="2%" />
          <IconButton onClick={() => window.open(links.facebook, "_blank")} icon={<Icon as={SiFacebook} />}  mr="2%" />
          <IconButton onClick={() => window.open(links.github, "_blank")} icon={<Icon as={SiGithub}/>}  mr="2%" />
          <MenuDrawer />
        </Flex>
      </Flex>
    </Box>
  );
}
