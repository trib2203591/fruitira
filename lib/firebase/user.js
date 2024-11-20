import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import { db, auth } from "./firebaseConfig"; 

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

export const deleteUserDataAndAuth = async () => {
    try {
      const user = auth.currentUser;
      const uid = user.uid;
      console.log('Deleting user data for UID:', uid);
      const usersRef = doc(db, 'users', uid); 
      const progressRef = doc(db, 'progress', uid);
  
      await deleteDoc(usersRef);
      console.log('User document deleted from users collection');
  
      await deleteDoc(progressRef);
      console.log('User document deleted from progress collection');
  
      if (user && user.uid === uid) {
        await deleteUser(user); 
        console.log('User deleted from Firebase Authentication');
      } else {
        console.log('No authenticated user or UID mismatch');
      }
  
    } catch (error) {
      console.error('Error deleting user data:', error.message);
      throw new Error('Failed to delete user data');
    }
  };
  