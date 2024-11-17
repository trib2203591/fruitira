import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";

import { auth } from "./firebaseConfig";
import { CreateNewProgress } from "./progress";
import { CreateNewUserDoc } from "./user";
import { authErrorMessages } from "../../constants/errorMessages";

export const register = async (email, username, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        console.log("New user created with email: ", user.email);
        await CreateNewUserDoc(user, username);
        await CreateNewProgress(user);
        return user; 
    } catch (error) {
        console.log("Register failed:", error.message); 
        const customMessage = authErrorMessages[error.code] || authErrorMessages.default;
        throw new Error(customMessage); 
    }
};



export const login = async (email, password) => {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        const user = res.user;
        console.log("Logged in with email: ", user.email);
        return user; 
    } catch (error) {
        console.log("Login failed:", error.message); 
        const customMessage = authErrorMessages[error.code] || authErrorMessages.default;
        throw new Error(customMessage); 
    }
}


