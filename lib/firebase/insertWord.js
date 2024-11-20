import { db } from './firebaseConfig';
import { collection, doc, setDoc } from 'firebase/firestore';

const fruits = {
  apple: { difficulty: 1, vietnamese: "táo" },
  banana: { difficulty: 1, vietnamese: "chuối" },
  grape: { difficulty: 1, vietnamese: "nho" },
  kiwi: { difficulty: 1, vietnamese: "kiwi" },
  lemon: { difficulty: 1, vietnamese: "chanh" },
  orange: { difficulty: 1, vietnamese: "cam" },
  strawberry: { difficulty: 1, vietnamese: "dâu tây" },
  watermelon: { difficulty: 1, vietnamese: "dưa hấu" },
  avocado: { difficulty: 2, vietnamese: "bơ" },
  coconut: { difficulty: 2, vietnamese: "dừa" },
  pineapple: { difficulty: 2, vietnamese: "dứa" },
  plum: { difficulty: 2, vietnamese: "mận" },
  fig: { difficulty: 3, vietnamese: "sung" },
  mangosteen: { difficulty: 3, vietnamese: "măng cụt" },
  pumpkin: { difficulty: 3, vietnamese: "bí ngô" }
};

// Capitalize first letter of each word
const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const storeWordsInFirestore = async () => {
  try {
    // Loop through each fruit object to create documents in Firestore
    for (const [fruit, { difficulty, vietnamese }] of Object.entries(fruits)) {
      const question = capitalizeFirstLetter(fruit);
      const key = capitalizeFirstLetter(vietnamese);
      
      // Define the document reference
      const docRef = doc(collection(db, 'questions'), fruit);

      // Set the document data
      await setDoc(docRef, {
        difficult: difficulty,
        question: question,
        key: key
      });

      console.log(`Successfully added ${fruit}`);
    }
  } catch (error) {
    console.error("Error storing words:", error);
  }
};