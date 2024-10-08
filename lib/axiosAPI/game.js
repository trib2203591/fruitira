import axios from "axios";

export async function getGame() {
    try {
        const response = await axios.get('http://192.168.1.6:3000/game');

        return {
          status: response.status,
          data: response.data,
        };
  } catch (error) {
      console.log("get game failed");
      console.log(error);
  }
}