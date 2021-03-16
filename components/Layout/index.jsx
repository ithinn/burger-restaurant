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
                <Header isUser={false}/>
            : login ? 
                <Header isUser={true} isLoggedIn={isLoggedIn}/>        
            : register ? 
                <Header  isUser={false}/>        
            : restaurant ? 
                <Header isUser={false}/>
            : user ? 
                <Header heading="Billy's burger" isUser={true} isLoggedIn={isLoggedIn}/>
            : <Header isUser={false}/> }
            
            <main>{children}</main>
        </>
    )
}

export default Layout;