import GlobalStyle from "../GlobalStyle";
import Header from "../Header";

function Layout( {isLoggedIn, children, home, login, register, restaurant, user} ) {
    return(
        <>
        
            <GlobalStyle/>
            
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