import AsyncStorage from '@react-native-async-storage/async-storage';

import { login } from '../axiosAPI/auth';
import { getScore } from '../axiosAPI/score';


const storeUser = async (user_id, username, password, score) => {
    try {
      const value = {
        user_id: user_id,
        username: username,
        password: password,
        score: score
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
      console.log("local user removed ok")
      return true;
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

const checkUserExistInDB = async () => {
  const user = await getUser();
  if(user) {
    try {
      const result = await login(user.username, user.password);
      if(result.status === 200) {
        const score = await getScore(result.user_id);
        return score ? score[0].score : null;
      }
    } catch (error) {
      console.log(error);
    }
  }
  return null;
}
const test = async () => {
    try {
        const user = await getUser();
        console.log(user);
    } catch (error) {
        console.log(error);
    }
  } 


    export { storeUser, getUser, removeUser, getCurrentUser, checkUserExistInDB, test };