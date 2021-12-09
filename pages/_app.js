import { ChakraProvider } from '@chakra-ui/react'
import { ColorModeScript } from "@chakra-ui/react";
import theme from "../lib/Theme";

// TODO: Change layout when mobile have less than 800px
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
