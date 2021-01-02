import type { AppContext, AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
// import { Layout } from '@/modules/layout';
// import App from 'next/app';
import { chakraTheme } from '@/lib/theme/chakraTheme';
// import { getLectureLevel, getSiblingLectures } from '@/engine/lectures/lectures';
// import { NextPageContext } from 'next';

interface Props extends AppProps {
  siblingLectures: Array<string>
}
function MyApp({ Component, pageProps }: Props) {

  return (
    <ChakraProvider theme={chakraTheme}>
      {/* <Layout sidebarItems={siblingLectures}>
        <Component {...pageProps} />
      </Layout> */}
      <Component {...pageProps} />
    </ChakraProvider>
  )
};

// MyApp.getInitialProps = async (appContext: AppContext) => {
//   const appProps = await App.getInitialProps(appContext);
//   const lectureLevel = getLectureLevel(appContext.ctx.query);
//   let componentProps = await appContext.Component.getInitialProps?.(appContext as any)

//   console.log(componentProps);

//   // console.log(componentProps, lectureLevel);
//   // if (appContext.Component.getInitialProps) {

//   // }

//   const siblingLectures = getSiblingLectures(lectureLevel, appContext.ctx.query);

//   return { ...appProps, siblingLectures }
// }

export default MyApp;
