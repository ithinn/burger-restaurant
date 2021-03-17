import GlobalStyle from "../GlobalStyle";
import Header from "../Header";
import Head from "next/head"

function Layout( {status, isLoggedIn, children, home, login, register, restaurant, user} ) {
    return(
        <>  
            <Head>
                <link rel="stylesheet" href="https://use.typekit.net/gsa0dnm.css"></link>
                
            </Head>
    
            {home ? 
                <Header isUser={false}/>
            : login ? 
                <Header isUser={true} heading="Logg inn" isCart={false} isLoggedIn={isLoggedIn}/>        
            : register ? 
                <Header  heading="Registrer deg" isUser={false} isCart={false}/>        
            : restaurant ? 
                <Header isUser={false} isCart={false}/>
            : status ? 
                <Header isUser={true} isCart={false}/>
            : user ? 
                <Header heading="Billy's burger" isUser={true} isCart={true}isLoggedIn={isLoggedIn}/>
            : <Header isUser={false} isCart={false}/> }
            
            <main>{children}</main>
        </>
    )
}

export default Layout;