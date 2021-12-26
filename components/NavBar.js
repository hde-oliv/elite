import {
  Box,
  Button,
  Flex,
  IconButton,
  useColorMode,
  Icon,
  Heading,
} from "@chakra-ui/react";
import { useContext } from "react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import dynamic from "next/dynamic";
import { SiDiscord, SiFacebook, SiGithub } from "react-icons/si";
import { useRouter } from "next/router";
import { UserContext } from "../lib/UserContext";

const MenuDrawer = dynamic(() => import("./MenuDrawer"));

export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const info = {
    name: "elite fansub",
    discord: "https://discord.gg/dh7NVW6A7U",
    facebook: "https://www.facebook.com/EliteFansub/",
    github: "https://github.com/hde-oliv/elite",
  };

  const { user, isAdmin } = useContext(UserContext);

  return (
    <Box pl="5%" pr="5%" pt="1.5%" pb="1.5%">
      <Flex p="0%">
        <Flex flex="1" justifyContent="start" mr="auto">
          <Heading
            width="100%"
            onClick={() => router.push("/")}
            userSelect="none"
            cursor="pointer"
          >
            {info.name}
          </Heading>
        </Flex>
        <Flex flex="1" justifyContent="end" ml="auto">
          {user && isAdmin && (
            <Button mr="2%" onClick={() => router.push("/admin")}>
              Admin
            </Button>
          )}
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
          <MenuDrawer />
        </Flex>
      </Flex>
    </Box>
  );
}
