import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig"; 

import { GetUserDoc } from "./user";

export const getLeaderBoard = async () => {
  try {
      const progressRef = collection(db, "progress");

      const topScoresQuery = query(progressRef, orderBy("score", "desc"), limit(10));
      const querySnapshot = await getDocs(topScoresQuery);
  
      const topScoresWithUsernames = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const progressData = doc.data();
          const userId = doc.id;
          const user = {
            uid: userId
          }

          const userInfo = await GetUserDoc(user);
  
          return {
            id: userId,
            score: progressData.score,
            level: progressData.level,
            username: userInfo?.username || "Unknown", 
          };
        })
      );
  
      return topScoresWithUsernames;
  } catch (error) {
    console.error("Error fetching Leaderboard :", error.message);
    throw new Error("Failed to retrieve Leaderboard ");
  }
};