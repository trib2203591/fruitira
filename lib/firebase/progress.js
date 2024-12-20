import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig"; 

export const CreateNewProgress = async (user) => {
    try {
        await setDoc(doc(db, "progress", user.uid), {
          level: 1,
          xp: 0,
          score: 0,
          total_answered: 0,
          right_answers: 0
        });
      
        console.log("New progress create in db for user: ", user.email);
    } catch (e) {
        console.error("Error adding document: ", e);
        throw new Error("Failed to create new progress in database");
    }
}

export const GetUserProgress = async (user) => {
    try {
        const docRef = doc(db, "progress", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
          } else {
            console.log("No such document!");
            return null;
          }
    } catch (error) {
        console.error("Error fetching document:", error.message);
        throw new Error("Failed to retrieve progress data");           
    }
}

export const UpdateProgressInDb = async (user, progress) => {
    try {
        const docRef = doc(db, "progress", user.uid);
        await updateDoc(docRef, progress);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
          } else {
            console.log("No such document!");
            return null;
          }
    } catch (error) {
        console.error("Error updating document:", error.message);
        throw new Error("Failed to update progress in database");

    }
}