import React, {createContext, useContext, useEffect, useState} from "react"

const UserContext = createContext({
    userName: null,
    getUserName: () => {},
    checkUserInfo: () => {}
})

export const User = ( {children} ) => {
    const [userName, setUserName] = useState(null)
    const [isUserIconChecked, setIsUserIconChecked] = useState(false);
    
    const getUserName = (user) => {
        setUserName(user);
    }

    const checkUserInfo = () => {
        isUserIconChecked ? setIsUserIconChecked(false) : setIsUserIconChecked(true);
    }

    return (
        <UserContext.Provider value={{isUserIconChecked, checkUserInfo, getUserName, userName}}>{ children }</UserContext.Provider>
    )
}

export const useUser = () => {
    return useContext(UserContext)
}