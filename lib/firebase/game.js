import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "./firebaseConfig"; // Update with your Firebase config
import gamePlay from "../../app/(game)/gamePlay";

export const getRandomQuestion = async (difficulty) => {
  try {
    const q = query(
      collection(db, "questions"),
      where("difficult", "==", difficulty)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("No questions found for the given difficulty");
    }

    const questions = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];

  } catch (error) {
    console.log("Error fetching random question:", error.message);
    throw error;
  }
};

export const getOptionsWithAnswer = async (docId) => {
  try {
    const questionRef = collection(db, "questions");

    // Fetch the document for the correct answer
    const docSnap = await getDocs(query(questionRef, where("__name__", "==", docId)));
    if (docSnap.empty) {
      throw new Error("Question not found");
    }

    const correctDoc = docSnap.docs[0];
    const correctAnswer = {
      key: correctDoc.data().key,
      id: correctDoc.id,
    };

    // Fetch all other questions except the current one
    const q = query(
      collection(db, "questions"),
      where("__name__", "!=", docId)
    );

    const querySnapshot = await getDocs(q);

    // Extract keys and docIds from the other documents
    const randomKeys = querySnapshot.docs
      .map((doc) => ({
        key: doc.data().key,
        id: doc.id,
      }))
      .filter((option) => option.key !== correctAnswer.key);

    if (randomKeys.length < 3) {
      throw new Error("Not enough random keys available");
    }

    // Pick three random keys
    const options = randomKeys.slice(0, 3);

    // Combine the correct answer with the random options and shuffle
    const allOptions = [...options, correctAnswer];
    for (let i = allOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
    }

    return allOptions;
  } catch (error) {
    console.error("Error fetching options:", error.message);
    throw error;
  }
};

export const getGame = async (difficulty) => {
  const question = await getRandomQuestion(difficulty);
  const options = await getOptionsWithAnswer(question.id);
  
  const game = {
    question: question,
    options: options,
  };
  
  return game;
}
