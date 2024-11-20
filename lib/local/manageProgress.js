import AsyncStorage from '@react-native-async-storage/async-storage';

export const StoreProgressLocal = async (progress) => {
    try {
    const stringValue = JSON.stringify(progress);
    await AsyncStorage.setItem('progress', stringValue);
    console.log("store progress local ok")
  } catch (e) {
    console.log(e);
  }
}

export const GetProgressLocal = async () => {
    try {
      const stringValue = await AsyncStorage.getItem('progress');
      return stringValue != null ? JSON.parse(stringValue) : null;
    } catch (e) {
      console.log(e);
    }
};

export const UpdateProgressLocal = async (progress) => {
    try {
    const stringValue = JSON.stringify(progress);
    await AsyncStorage.setItem('progress', stringValue);
    console.log("update progress local ok")
  } catch (e) {
    console.log(e);
  }
}