import { ChakraProvider } from '@chakra-ui/react'
import { ColorModeScript } from "@chakra-ui/react";
import theme from "../lib/Theme";

function MyApp({ Component, pageProps }) {
    return (
      <ChakraProvider>
        <ColorModeScript
          initialColorMode={theme.config.initialColorMode}
        />
        <Component {...pageProps} />
      </ChakraProvider>
    );
}

export default MyApp
