import { createContext, useContext, useState, useEffect } from "react";
import { checkUserExistInDB, getUser, storeUser } from "../lib/local/manageUser";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const prepareApp = async () => {
        try {
            const user = await getUser();
            if (user) {
                const score = await checkUserExistInDB();
                if (score) {
                    setIsLoggedIn(true);
                    setUser({ ...user, score: score });
                    await storeUser(user.user_id, user.username, user.password, score);
                } else {
                    setIsLoggedIn(false);
                    setUser(null);
                }
            } else {
                setIsLoggedIn(false);
                setUser(null);
            }
        } catch (error) {
            console.log("Error preparing app:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // UseEffect runs only once on component mount due to the empty dependency array
    useEffect(() => {
        prepareApp();
    }, []); // Empty dependency array ensures it runs once

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                isLoading
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
