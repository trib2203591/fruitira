import { View, Text,SafeAreaView, ScrollView, StatusBar, StyleSheet } from 'react-native'
import { useState, useCallback } from 'react'
import { useFocusEffect } from 'expo-router'
import { router } from 'expo-router'

import CustomButton from '../../components/CustomButton'

import { getScore } from '../../lib/local/manageScore'
import { useGlobalContext } from '../../context/GlobalProvider'
import Logo from '../../components/Logo'

const Home = () => {
  const {user} = useGlobalContext();
  const [score, setScore] = useState(user.score)
  useFocusEffect(
    useCallback(() => {
        setScore(getScore())
      },
      [],)
  )
  return (
    <SafeAreaView className="bg-primary h-full">
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View className="w-full justify-center items-center h-full px-4 my-6">
        <Logo/>
        <Text className="text-2xl text-white mt-10 font-semibold">Your score: {score}</Text>
        <CustomButton
          title="Start"
          handlePress={() => {router.push('/gamePlay')}}
          containerStyles="w-[228px] h-[228px] mt-7"
          textStyles="font-psemibold text-3xl" 
        />
      </View>
      
      <StatusBar backgroundColor='#161622'
          style='inverted'
      />
    </ScrollView>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Home