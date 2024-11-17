import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig"; 

export const CreateNewUserDoc = async (user, username) => {
    try {
        await setDoc(doc(db, "users", user.uid), {
          email : user.email,
          username : username
        });
      
        console.log("New user create in db : ", username);
    } catch (e) {
        console.error("Error creating new user: ", e);
    }
}

export const GetUserDoc = async (user) => {
    try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
          } else {
            console.log("No such document!");
            return null;
          }
    } catch (error) {
        console.error("Error fetching document:", error.message);
        throw new Error("Failed to retrieve user data");
    }
}
