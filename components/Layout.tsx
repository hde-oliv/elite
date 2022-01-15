import { ColorModeScript } from "@chakra-ui/react";
import { UserContext } from "../lib/UserContext";
import { useEffect, useState } from "react";
import { NextRouter, useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, checkAdmin, logoutFromGoogle } from "../lib/Firebase";
import Head from "next/head";
import theme from "../lib/Theme";
import { Box, Container, ScaleFade } from "@chakra-ui/react";

interface MainProps {
  router: NextRouter;
}

const Main: React.FC<MainProps> = ({ children, router }) => {
  const [user] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(null || Boolean);

  useEffect(() => {
    if (user != null) {
      checkAdmin(user).then((res) => {
        if (!res) {
          logoutFromGoogle();
          setIsAdmin(false);
          router.push("/");
        } else {
          setIsAdmin(true);
        }
      });
    }
    setIsAdmin(false);
  }, [user]);

  return (
    <Box>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <UserContext.Provider value={{ user, isAdmin }}>
        <ScaleFade key={router.route} in={true}>
          <Head>
            <link rel="icon" href="/favicon.ico" />
            <title>elite fansub</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>
          <Container maxW="container.xl" centerContent>
            {children}
          </Container>
        </ScaleFade>
      </UserContext.Provider>
    </Box>
  );
};

export default Main;
