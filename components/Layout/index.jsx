import GlobalStyle from "../GlobalStyle";
import Header from "../Header";
import Head from "next/head"

function Layout( {isLoggedIn, children, home, login, register, restaurant, user} ) {
    return(
        <>  
            <Head>
                <link rel="stylesheet" href="https://use.typekit.net/gsa0dnm.css"></link>
            </Head>
        
           
            
            {home ? 
                <Header heading="Billy's burger" isUser={false}/>
            : login ? 
                <Header heading="Billy's burger" isUser={true} isLoggedIn={isLoggedIn}/>        
            : register ? 
                <Header heading="Billy's burger" isUser={false}/>        
            : restaurant ? 
                <Header heading="Billy's burger" isUser={false}/>
            : user ? 
                <Header heading="Billy's burger" isUser={true} isLoggedIn={isLoggedIn}/>
            : <Header heading="Billy's burger" isUser={false}/> }
            
            <main>{children}</main>
        </>
    )
}

export default Layout;