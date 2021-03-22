import Header from "../Header";
import Head from "next/head"

function Layout( {status, isLoggedIn, children, home, login, register, restaurant } ) {
    return(
        <>  
            <Head>
                <link rel="stylesheet" href="https://use.typekit.net/gsa0dnm.css"></link>
            </Head>
    
            {home ? 
                <Header isUser={true} isCart={true}/>
            : login ? 
                <Header isUser={true} heading="Logg inn" isCart={false} isLoggedIn={isLoggedIn}/>        
            : register ? 
                <Header  heading="Registrer deg" isUser={false} isCart={false}/>        
            : restaurant ? 
                <Header heading="Bestillinger" isUser={false} isCart={false}/>
            : status ? 
                <Header isUser={true} isCart={false}/>
            : <Header isUser={false} heading="Bestillinger" isCart={false}/> }
            
            <main>{children}</main>
        </>
    )
}

export default Layout;