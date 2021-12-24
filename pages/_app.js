import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "../lib/Theme";
import { UserContext } from "../lib/UserContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, isAdmin, logoutFromGoogle } from "../lib/Firebase";

function MyApp({ Component, pageProps }) {
  const [user] = useAuthState(auth);
  const [staff, setStaff] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (user != null) {
      isAdmin(user).then((res) => {
        if (!res) {
          logoutFromGoogle();
          setStaff(null);
          router.push("/");
        } else {
          setStaff(true);
        }
      });
    }
    setStaff(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <ChakraProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <UserContext.Provider value={{ user, staff }}>
          <Component {...pageProps} />
        </UserContext.Provider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
