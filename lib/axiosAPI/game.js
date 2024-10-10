import axios from "axios";

export async function getGame() {
    try {
        const response = await axios.get('http://10.13.130.37:3000/game');

        return {
          status: response.status,
          data: response.data,
        };
  } catch (error) {
      console.log("get game failed");
      console.log(error);
  }
}