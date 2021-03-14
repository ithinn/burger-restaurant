import React, {createContext, useContext, useEffect, useState} from "react"

const BasketContext = createContext({
    productLines: [],
    addProductLine: () => {},
    isCartChecked: false,
    checkCart: () => {},
    total: 0,
    addSum: () => {}
    
})

export const Basket = ( {children} ) => {


    const [productLines, setProductLines] = useState([]);
    const [isCartChecked, setIsCartChecked] = useState(false);
    const [total, setTotal] = useState(0)
    const [sumArray, setSumArray] = useState([])

    const addProductLine = (product) => {
        setProductLines(product);
    }

    const addSum = (name, sum) => {
        //console.log(sum);
       // console.log(name);
        let test;
        
        /*
        test = {
            ...productLines, price: sum
        }*/

        console.log("PRODLINES", productLines);
        
        productLines.forEach((el, index) => {

            if (el.name === name) {
               test= {
                    ...productLines[index], price: sum
                }
            }

            //setProductLines([...productLines, test]);
    
        })

        console.log(test);
        
    }

    
    //console.log(total);
    /*
    useEffect(() => {
        const total = productLines.reduce((prev, cur) => {
            return prev + cur.price
        }, 0);

        setTotal(total);


    }, [productLines])
*/
    const checkCart = (event) => {
  
        isCartChecked ? setIsCartChecked(false) : setIsCartChecked(true);
        window.scrollTo(0, 0);
    }

    return(
        <BasketContext.Provider value={{productLines, addProductLine, isCartChecked, checkCart, total, addSum}}>{children}</BasketContext.Provider>
    )
}


export const useBasket = () => {
    return useContext(BasketContext)
}