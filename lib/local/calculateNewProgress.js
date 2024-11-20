import { xpTable } from "../../constants/xpTable";

const CalculateNewProgress = (progress, correct, progressFactor) => {
    try {
        if(progress.level === 20 && progress.xp === xpTable[20]) return progress;
        const newProgress = {
            level: progress.level,
            xp: progress.xp,
            score: progress.score,
            total_answered: progress.total_answered + 1,
            right_answers: progress.right_answers
        };
        if(!correct) {
            if(progress.xp-progressFactor.xp >= 0){
                newProgress.xp = progress.xp - progressFactor.xp;
            }
            else {
                newProgress.xp = 0;
            }
            if(progress.score-progressFactor.score >= 0){
                newProgress.score = progress.score - progressFactor.score;
            }
            else {
                newProgress.score = 0;
            }
        }
        else if(correct){
            newProgress.right_answers = progress.right_answers + 1;
            newProgress.score = progress.score + progressFactor.score;
            if(progress.xp+progressFactor.xp >= xpTable[progress.level]){
                console.log("xp before level up: ", progress.xp);
                console.log("score factor: ", progressFactor.xp);
                console.log("xp needed for level up: ", xpTable[progress.level]);
                console.log("xp after level up: ", progress.xp + progressFactor.xp - xpTable[progress.level]);
                newProgress.xp = progress.xp + progressFactor.xp - xpTable[progress.level];
                newProgress.level = progress.level + 1;
            }
            else{
                newProgress.xp = progress.xp + progressFactor.xp;
            }
        }
        return newProgress;
    } catch (error) {
        console.error("Error calculating new progress:", error.message);
        throw new Error("Something went wrong while calculating new progress");
    }
}

export {CalculateNewProgress};