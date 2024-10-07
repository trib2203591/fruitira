import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

import CustomButton from '../../components/CustomButton';
import { testGetUser, removeUser} from '../../lib/local/manageUser';
import { useGlobalContext } from '../../context/GlobalProvider';


const Profile = () => {
  const {user} = useGlobalContext();
  const logOut = async () => {
    try {
      const user = await removeUser()
      router.replace('/');
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View className="w-full justify-center items-center h-full px-4 my-6">
          <Text className="text-3xl text-white font-bold text-center">Hello, {user?.username}</Text>
          <CustomButton
            title="Log out"
            handlePress={logOut}
            containerStyles="w-full mt-7" 
          />
        </View>
        <StatusBar backgroundColor='#000000'
            style='inverted'
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  scrollViewContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})