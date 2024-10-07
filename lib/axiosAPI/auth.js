import axios from "axios";

export async function register(username, password) {
  try {
      console.log(`--${username} ${password}--`)
      const response = await axios.post('http://localhost:3000/register', {
          username: username,
          password: password,
      });

      console.log(`status: ${response.status}`);
      console.log(response.data.message);

      return {
          status: response.status,
          message: response.data.message,
      };
  } catch (error) {
      console.log("login failed");
      console.log(error);

      return {
          status: error.response ? error.response.status : 500,
          message: error.response ? error.response.data.message : "Login failed",
      };
  }
}

export async function login(username, password) {
  try {
      const response = await axios.post('http://localhost:3000/login', {
          username: username,
          password: password,
      });

      console.log(`status: ${response.status}`);
      console.log(response.data.message);

      return {
          status: response.status,
          message: response.data.message,
      };
  } catch (error) {
      console.log("login failed");
      console.log(error);

      return {
          status: error.response ? error.response.status : 500,
          message: error.response ? error.response.data.message : "Login failed",
      };
  }
}

