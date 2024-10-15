import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { router, Link } from 'expo-router';

import CustomButton from '../../components/CustomButton';
import { removeUser } from '../../lib/local/manageUser';
import { useGlobalContext } from '../../context/GlobalProvider';


const Profile = () => {
  const {user, setIsLoggedIn} = useGlobalContext();
  const logOut = async () => {
    try {
      const user = await removeUser()
      setIsLoggedIn(false)
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
          <View className="flex-row justify-center items-center pt-6">
            <Text className="text-sm text-white font-bold">If you want to delete your account, </Text>
            <Link href="/deleteAccount" className="text-sm text-secondary underline font-bold">click here</Link>
          </View>
        </View>
        <StatusBar backgroundColor='#161622'
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