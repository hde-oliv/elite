import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head';
import NavBar from '../components/NavBar'

function MyApp({ Component, pageProps }) {
    return (
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    );
}

export default MyApp
