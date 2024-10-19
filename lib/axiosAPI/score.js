import API from "./APIManager";


export const getScore = async (user_id) => {
    try {
        const response = await API("/get-score", {
            method: "POST",
            data: {
                user_id: user_id,
            },
        });
        return response.data;
    } catch (error) {
        console.log("failed to get score");
        console.log(error);
        return { status: "500" };
    }
};

export const updateScoreInDB = async (user_id, score) => {
    try {
        const response = await API("/update-score", {
            method: "POST",
            data: {
                user_id: user_id,
                score: score,
            },
        });
        return response.data;
    } catch (error) {
        console.log("failed to update score");
        console.log(error);
        return { status: "500" };
    }
};

export const getLeaderboard = async () => {
    try {
        const response = await API("/leaderboard");
        return response.data;
    } catch (error) {
        console.log("failed to get leaderboard");
        console.log(error);
        return { status: "500" };
    }
};