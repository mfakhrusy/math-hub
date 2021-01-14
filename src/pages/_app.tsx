import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { chakraTheme } from "@/lib/theme/chakraTheme";
import { ReactElement } from "react";

interface Props extends AppProps {
  siblingLectures: Array<string>;
}
function MyApp({ Component, pageProps }: Props): ReactElement {
  return (
    <ChakraProvider theme={chakraTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
