import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: "Readex Pro",
    body: "Nunito"
  },
  components: {
    Button: {
      baseStyle: {
        fontFamily: "heading",
        fontWeight: "medium",
      }
    }
  }
});

export default theme;
