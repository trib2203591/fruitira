import AsyncStorage from '@react-native-async-storage/async-storage';

import { login } from '../axiosAPI/auth';
import { getScore } from '../axiosAPI/score';


const storeUser = async (user, username, password) => {
    try {
      const value = {
        uid: user.uid,
        email: user.email,
        username: username,
        password: password,
      }
      const stringValue = JSON.stringify(value);
      await AsyncStorage.setItem('user', stringValue);
      console.log("storeuser ok")
    } catch (e) {
      console.log(e);
    }
};

const getUser = async () => {
    try {
      const stringValue = await AsyncStorage.getItem('user');
      return stringValue != null ? JSON.parse(stringValue) : null;
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


    export { storeUser, getUser, removeUser, getCurrentUser };