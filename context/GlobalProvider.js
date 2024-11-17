import { createContext, useContext, useState, useEffect } from "react";

import { getUser, storeUser } from "../lib/local/manageUser";
import { StoreProgressLocal } from "../lib/local/manageProgress";
import { login } from "../lib/firebase/auth";
import { GetUserProgress } from "../lib/firebase/progress";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [progress, setProgress] = useState(null)
    const [isLoading, setIsLoading] = useState(true);

    const prepareApp = async () => {
        try {
            var user = await getUser(); 
            console.log(user);
            if(!user) {
                return;
            }
            user = await login(user.email, user.password); 
            if (user) {
                const progress = await GetUserProgress(user); 
                setIsLoggedIn(true);
                const userInfo = await getUser();
                setUser(userInfo); 
                console.log(userInfo);
                
                setProgress(progress) 
                await StoreProgressLocal(progress);
            } else {
                setIsLoggedIn(false);
                setUser(null);
                setProgress(null);
            }
        } catch (error) {
            console.log("Error preparing app:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        prepareApp();
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                isLoading,
                setIsLoading,
                progress, 
                setProgress
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
