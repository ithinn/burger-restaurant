import React, {createContext, useContext, useEffect, useState} from "react"

const BasketContext = createContext({
    productLines: [],
    addProductLine: () => {}
    
})

export const Basket = ( {children} ) => {


    const [productLines, setProductLines] = useState([]);
    

    const addProductLine = (product) => {
        console.log(product)
        console.log("add kjører")
        setProductLines(product);
    }


    return(
        <BasketContext.Provider value={{productLines, addProductLine}}>{children}</BasketContext.Provider>
    )
}


export const useBasket = () => {
    return useContext(BasketContext)
}