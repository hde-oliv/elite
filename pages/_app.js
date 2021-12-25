import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "../lib/Theme";
import { UserContext } from "../lib/UserContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, checkAdmin, logoutFromGoogle } from "../lib/Firebase";

function MyApp({ Component, pageProps }) {
  const [user] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (user != null) {
      checkAdmin(user).then((res) => {
        if (!res) {
          logoutFromGoogle();
          setIsAdmin(null);
          router.push("/");
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
      <ChakraProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <UserContext.Provider value={{ user, isAdmin }}>
          <Component {...pageProps} />
        </UserContext.Provider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
