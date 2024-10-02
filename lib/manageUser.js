import AsyncStorage from '@react-native-async-storage/async-storage';

const storeUser = async (username, password) => {
    try {
      const value = {
        username: username,
        password: password
      }
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('user', jsonValue);
      console.log("storeuser ok")
    } catch (e) {
      console.log(e);
    }
};

const getUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };

const removeUser = async () => {
    try {
      await AsyncStorage.removeItem('user');
    } catch(e) {
      console.log(e);
    }
  }

const getCurrentUser = async () => {
    try {
      getUser()
            .then((res) => {
                if(res) {
                    console.log("OK")
                } else {
                    console.log("Failed")
                }
            })
            .catch((err) => {
                console.log(error);
            })
    } catch (error) {
      console.log(e);
    }
}

/*   export async function test() {
    try {
        const user ={
            username: "a",
            password: "a"
        }
        return storeUser(user);
    } catch (error) {
        console.log(error);
    }
  } */
  const testGetUser = async () => {
    try {
        const user = await getUser()
        if(user){
            console.log(user)
        }
        else console.log("error")
    } catch (error) {
        console.log(error);
    }
  } 
  const testRemoveUser = async () => {
    try {
        await removeUser()
        console.log("user removed")
    } catch (error) {
        console.log(error);
    }
} 


    export { storeUser, getUser, removeUser, testGetUser, testRemoveUser, getCurrentUser };