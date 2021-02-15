function GamePage( { id } ){
    return(
        <h1>Du er på side med i {id}</h1>
    )
}

GamePage.getInitialProps = async ( { query } ) => {
    return(
        query.id 
    )
    
};

export default GamePage;