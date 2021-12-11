import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useColorMode,
  Icon,
  Text,
  Image,
  Heading,
} from "@chakra-ui/react";
import { MoonIcon, SearchIcon, SunIcon } from "@chakra-ui/icons";
import MenuDrawer from "./MenuDrawer";
import { SiDiscord, SiFacebook, SiGithub } from "react-icons/si";
import { useRouter } from "next/router";

export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const info = {
    name: "elite fansub",
    discord: "https://discord.gg/dh7NVW6A7U",
    facebook: "https://www.facebook.com/EliteFansub/",
    github: "https://github.com/hde-oliv/elite",
  };

  return (
    <Box pl="5%" pr="5%" pt="1.5%" pb="1.5%">
      <Flex p="0%">
        <Flex flex="1" justifyContent="start" mr="auto">
          <Heading onClick={() => router.push("/")} cursor="pointer">
            {info.name}
          </Heading>
        </Flex>
        <Flex flex="3" justifyContent="center" alignSelf="center">
          <InputGroup>
            <Input placeholder="Pesquisar" />
            <InputRightElement>
                <IconButton type="submit" size="md" icon={<SearchIcon />} />
                </InputRightElement>
          </InputGroup>
        </Flex>
        <Flex flex="1" justifyContent="end" ml="auto">
          <Button onClick={() => toggleColorMode()} mr="2%">
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
          <IconButton
            onClick={() => window.open(info.discord, "_blank")}
            icon={<Icon as={SiDiscord} />}
            mr="2%"
          />
          <IconButton
            onClick={() => window.open(info.facebook, "_blank")}
            icon={<Icon as={SiFacebook} />}
            mr="2%"
          />
          <IconButton
            onClick={() => window.open(info.github, "_blank")}
            icon={<Icon as={SiGithub} />}
            mr="2%"
          />
          <MenuDrawer />
        </Flex>
      </Flex>
    </Box>
  );
}
