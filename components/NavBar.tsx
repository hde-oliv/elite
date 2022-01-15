import {
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
import { SiDiscord, SiFacebook } from "react-icons/si";
import { useRouter } from "next/router";
import { UserContext } from "../lib/UserContext";

const MenuDrawer = dynamic(() => import("./MenuDrawer"));

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, isAdmin } = useContext(UserContext);
  const router = useRouter();
  const info = {
    name: "elite fansub",
    discord: "https://discord.gg/dh7NVW6A7U",
    facebook: "https://www.facebook.com/EliteFansub/",
    github: "https://github.com/hde-oliv/elite",
  };

  return (
    <Flex
      pl={{ base: "1%", lg: "5%" }}
      pr={{ base: "1%", lg: "5%" }}
      pt={{ base: "4%", lg: "1.5%" }}
      pb="1.5%"
      flexDirection={{ base: "column", lg: "row" }}
    >
      <Flex
        flex="1"
        alignSelf={{ base: "center", lg: "inherit" }}
        justifyContent={{ base: "center", lg: "start" }}
        mr={{ base: "0px", lg: "auto" }}
      >
        <Heading
          width="100%"
          fontSize={{ base: "4xl", md: "5xl", xl: "4xl" }}
          onClick={() => router.push("/")}
          userSelect="none"
          cursor="pointer"
        >
          {info.name}
        </Heading>
      </Flex>
      <Flex
        flex="1"
        mt={{ base: "2%", lg: "0%" }}
        alignSelf={{ base: "center", lg: "inherit" }}
        justifyContent={{ base: "center", lg: "end" }}
        ml={{ base: "0px", lg: "auto" }}
      >
        {user && isAdmin && (
          <Button mr="2%" onClick={() => router.push("/admin")}>
            Admin
          </Button>
        )}
        <Button onClick={() => toggleColorMode()} mr="2%">
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
        <IconButton
          aria-label="discord"
          onClick={() => window.open(info.discord, "_blank")}
          icon={<Icon as={SiDiscord} />}
          mr="2%"
        />
        <IconButton
          aria-label="facebook"
          onClick={() => window.open(info.facebook, "_blank")}
          icon={<Icon as={SiFacebook} />}
          mr="2%"
        />
        <MenuDrawer />
      </Flex>
    </Flex>
  );
};

export default NavBar;
