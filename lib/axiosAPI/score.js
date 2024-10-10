import axios from "axios";

export async function getScore(user_id) {
    try {
        const response = await axios.post('http://10.13.130.37:3000/get-score', {
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
        const response = await axios.post('http://10.13.130.37:3000/update-score', {
            user_id: user_id,
            score: score,
        });
        console.log(response.data);
    } catch (error) {
        console.log("failed to update score");
        console.log(error);
    }
}

export async function getLeaderboard() {
    try {
        const response = await axios.get('http://10.13.130.37:3000/leaderboard');
        return response.data;
    } catch (error) {
        console.log("failed to get leaderboard");
        console.log(error);
    }
}