import { ChakraProvider, ScaleFade } from "@chakra-ui/react";
import { ColorModeScript } from "@chakra-ui/react";
import { UserContext } from "../lib/UserContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, checkAdmin, logoutFromGoogle } from "../lib/Firebase";
import "@fontsource/nunito/400.css";
import "@fontsource/nunito/600.css";
import "@fontsource/nunito/500.css";
import "@fontsource/nunito/700.css";
import "@fontsource/readex-pro/700.css";
import "@fontsource/readex-pro/400.css";
import "@fontsource/readex-pro/500.css";
import "@fontsource/readex-pro/600.css";
import theme from "../lib/Theme";
import Head from "next/head";

function MyApp({ Component, pageProps, router }) {
  const [user] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(null);
  const r = useRouter();

  useEffect(() => {
    if (user != null) {
      checkAdmin(user).then((res) => {
        if (!res) {
          logoutFromGoogle();
          setIsAdmin(null);
          r.push("/");
        } else {
          setIsAdmin(true);
        }
      });
    }
    setIsAdmin(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <UserContext.Provider value={{ user, isAdmin }}>
          <ScaleFade key={router.route} in="true">
            <Head>
              <link rel="icon" href="/favicon.ico" />
              <title>elite fansub</title>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
            </Head>
            <Component {...pageProps} />
          </ScaleFade>
        </UserContext.Provider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
