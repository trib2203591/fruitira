import axios from "axios";

export async function getScore(user_id) {
    try {
        const response = await axios.post('http://192.168.1.6:3000/get-score', {
            user_id: user_id,
        });
  
        return response.data;
    } catch (error) {
        console.log("failed to get score");
        console.log(error);
    }
}

export async function updateScoreInDB(user_id, score) {
    try {
        const response = await axios.post('http://192.168.1.6:3000/update-score', {
            user_id: user_id,
            score: score,
        });
        console.log(response.data);
    } catch (error) {
        console.log("failed to update score");
        console.log(error);
    }
}