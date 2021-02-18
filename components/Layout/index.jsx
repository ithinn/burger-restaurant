import GlobalStyle from "../GlobalStyle";
import Header from "../Header";

function Layout( {children, home, restaurant, user} ) {
    return(
        <>
        
            <GlobalStyle/>
            
            {home ? 
                <Header heading="home"/>
            : restaurant ? 
                <Header heading="restaurant"/>
            : user ? 
                <Header heading="user"/>
            : <Header heading="kitchen"/> }
            
            <main>{children}</main>
        </>
    )
}

export default Layout;