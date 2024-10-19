import API from "./APIManager"

export const register = async (username, password) => {
    try {
        const response = await API("/register", {
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
        console.log("register failed");
        console.log(error);
        
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
            status: "500",
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