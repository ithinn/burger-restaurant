import '../styles/globals.css'
import {AuthProvider} from "../config/auth"
import {Basket} from "../context/BasketContext";
import { User } from "../context/UserContext";
import {ThemeProvider} from "styled-components";
import theme from "../styles/theme";


import { FormProvider } from 'react-hook-form';

function MyApp({ Component, pageProps }) {
  return (
  
    <ThemeProvider theme={theme}>
    <AuthProvider>
      <Basket>
        <User>
        <Component {...pageProps} />
        </User>
      </Basket>
    </AuthProvider>
      
    </ThemeProvider>
    
  ) 
}

export default MyApp
