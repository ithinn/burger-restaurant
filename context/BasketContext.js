import React, {createContext, useContext, useEffect, useState} from "react"

const BasketContext = createContext({
    productLines: [],
    addProductLine: () => {},
    isCartChecked: false,
    checkCart: () => {},
    total: 0,
    removeItem: () => {},
    updateProductLines: () => {},
    
    
})

export const Basket = ( {children} ) => {


    const [productLines, setProductLines] = useState([]);
    const [isCartChecked, setIsCartChecked] = useState(false);
    const [total, setTotal] = useState(0)
    const [userName, setUserName] = useState(null)

    const addProductLine = (product) => {
        
        setProductLines([...productLines, product]);
    
    }

    const emptyProductLine = () => {
        setProductLines([]);
    }


    function updateProductLines(index, value) {

        let tempArray = [...productLines];

        let basePrice = tempArray[index].basePrice;

        tempArray[index] = {...tempArray[index], count: value,  price: basePrice * value}

        setProductLines(tempArray);
    }

    function removeItem(index) {

        let tempArray = [...productLines];
        
        tempArray.splice(index, 1);

        setProductLines(tempArray);
    }

    useEffect(() => {
        const total = productLines.reduce((prev, cur) => {
            return prev + cur.price
        }, 0);

        setTotal(total);

    }, [productLines])


    const checkCart = () => {
        isCartChecked ? setIsCartChecked(false) : setIsCartChecked(true);
        window.scrollTo(0, 0);
    }

    return(
        <BasketContext.Provider value={{emptyProductLine, removeItem, productLines, updateProductLines, addProductLine, isCartChecked, checkCart, total}}>{children}</BasketContext.Provider>
    )
}


export const useBasket = () => {
    return useContext(BasketContext)
}