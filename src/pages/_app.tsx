import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import MadeWithLove from "../components/MadeWithLove";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.50",
      },
    },
  },
  colors: {
    yellow: {
      50: "#FFFFF0",
      100: "#FEFCBF",
      200: "#FAF089",
      300: "#F6E05E",
      400: "#ECC94B",
      500: "#D69E2E",
      600: "#B7791F",
      700: "#975A16",
      800: "#744210",
      900: "#5F370E",
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
      <MadeWithLove />
    </ChakraProvider>
  );
}

export default MyApp;
