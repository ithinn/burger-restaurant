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
        setProductLines(product);
    }

    const checkCart = (event) => {
  
        isCartChecked ? setIsCartChecked(false) : setIsCartChecked(true);
        window.scrollTo(0, 0);
    }

    return(
        <BasketContext.Provider value={{productLines, addProductLine, isCartChecked, checkCart}}>{children}</BasketContext.Provider>
    )
}


export const useBasket = () => {
    return useContext(BasketContext)
}