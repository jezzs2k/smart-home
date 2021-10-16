import AsyncStorage from '@react-native-async-storage/async-storage';

const getKey = async (key: string) => {
  return await AsyncStorage.getItem(key);
};

const setKey = async (key: string, value: string) => {
  return await AsyncStorage.setItem(key, value);
};

const removeKey = async (key: string) => {
  return await AsyncStorage.removeItem(key);
};

export {getKey, setKey, removeKey};
