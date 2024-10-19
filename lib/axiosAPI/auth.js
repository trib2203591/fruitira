import API from "./APIManager"

export const register = async (username, password) => {
    let response = null;
    try {
        response = await API("/register", {
            method: "POST",
            data:{
                username: username,
                password: password
            }
        })
        console.log(response.status);
        console.log(response.data.message);
    } catch (error) {
        console.log("register failed");
        console.log(error);
        return {
            status: error?.response?.status || 500, 
            message: error?.response?.data?.message || "something went wrong", 
        };
    }
}

export const login = async (username, password) => {
    try {
        const response = await API("/login", {
            method: "POST",
            data:{
                username: username,
                password: password
            }
        })
        return {
            status: response.status,
            message: response.data.message,
            user_id: response.data.user_id,
        };
    } catch (error) {
        console.log("login failed");
        console.log(error);
        return {
            status: error?.response?.status || 500, 
            message: error?.response?.data?.message || "something went wrong", 
        };
    }
}


  export const deleteAccount = async (username, password) => {
    try {
        const response = await API("/delete", {
            method: "POST",
            data:{
                username: username,
                password: password
            }
        })
        return {
            status: response.status,
            message: response.data.message,
        };
    } catch (error) {
        console.log("failed to delte account");
        console.log(error);
        return {
            status: "500",
        };
    }
  } 