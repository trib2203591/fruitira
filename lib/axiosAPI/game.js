import API from "./APIManager";

export const getGame = async () => {
  try {
    const response = await API("/game");
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    console.log("get game failed");
    console.log(error);
  }
}