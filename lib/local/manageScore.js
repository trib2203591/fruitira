import AsyncStorage from '@react-native-async-storage/async-storage';

import { updateScoreInDB } from '../axiosAPI/score';

const updateScore = async (newScore) => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      
      // If user data exists, parse it
      if (jsonValue != null) {
        const userData = JSON.parse(jsonValue);
        
        // Merge the new score with existing data
        const updatedUserData = {
          ...userData,
          score: newScore
        };

        // Save the updated data back to AsyncStorage
        await AsyncStorage.mergeItem('user', JSON.stringify(updatedUserData));

        // Update the score in the database
        await updateScoreInDB(userData.user_id, newScore);
        
        console.log("User score updated successfully");
      } else {
        console.log("No user data found to update");
      }
      
    } catch (e) {
      console.error("Failed to update score: ", e);
    }
};

export {updateScore}