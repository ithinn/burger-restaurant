import React, {createContext, useContext, useEffect, useState} from "react"

const BasketContext = createContext({
    productLines: [],
    addProductLine: () => {},
    isCartChecked: false,
    checkCart: () => {}
    
})

export const Basket = ( {children} ) => {


    const [productLines, setProductLines] = useState([]);
    const [isCartChecked, setIsCartChecked] = useState(false);
    

    const addProductLine = (product) => {
        console.log(product)
        console.log("add kjører")
        setProductLines(product);
    }

    const checkCart = (event) => {
        console.log(event.target)
        console.log("Cart is")
        isCartChecked ? setIsCartChecked(false) : setIsCartChecked(true);
    }

    return(
        <BasketContext.Provider value={{productLines, addProductLine, isCartChecked, checkCart}}>{children}</BasketContext.Provider>
    )
}


export const useBasket = () => {
    return useContext(BasketContext)
}