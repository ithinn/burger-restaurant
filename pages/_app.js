import '../styles/globals.css'
import {AuthProvider} from "../config/auth"
import {Basket} from "../context/BasketContext";
import {ThemeProvider} from "styled-components";
import theme from "../styles/theme";


import { FormProvider } from 'react-hook-form';

function MyApp({ Component, pageProps }) {
  return (
  
    <ThemeProvider theme={theme}>
    <AuthProvider>
      <Basket>
        <Component {...pageProps} />
      </Basket>
    </AuthProvider>
      
    </ThemeProvider>
    
  ) 
}

export default MyApp
