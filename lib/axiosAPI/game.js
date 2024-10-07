import axios from "axios";

export async function getGame() {
    try {
        const response = await axios.get('http://192.168.1.6:3000/game');
  
        return response.data;
    } catch (error) {
        console.log("failed to load game");
        console.log(error);
    }
}