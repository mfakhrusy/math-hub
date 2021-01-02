import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { chakraTheme } from '@/lib/theme/chakraTheme';

interface Props extends AppProps {
  siblingLectures: Array<string>
}
function MyApp({ Component, pageProps }: Props) {

  return (
    <ChakraProvider theme={chakraTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
};

export default MyApp;
