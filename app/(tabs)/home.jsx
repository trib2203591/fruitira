import { View, Text,SafeAreaView, ScrollView, StatusBar, StyleSheet, ImageBackground } from 'react-native'
import { useState, useCallback } from 'react'
import { useFocusEffect } from 'expo-router'
import { router } from 'expo-router'

import CustomButton from '../../components/CustomButton'
import { images } from '../../constants'

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
    <ImageBackground source={images.backGround} resizeMode="cover" className="h-full">
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View className="w-full justify-center items-center h-full px-4 my-6">
        <Logo/>
        <Text className="text-2xl text-secondary-200 mt-20 font-psemibold">Your score: {score}</Text>
        <CustomButton
          title="Start"
          handlePress={() => {router.push('/gamePlay')}}
          containerStyles="w-[228px] h-[228px] mt-7"
          textStyles="font-psemibold text-3xl" 
        />
      </View>
      
      <StatusBar backgroundColor='#9cdcfe'
            style='light'
          />
    </ScrollView>
    </ImageBackground>
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