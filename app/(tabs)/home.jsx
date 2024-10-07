import { View, Text,SafeAreaView, ScrollView, StatusBar, StyleSheet } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

import CustomButton from '../../components/CustomButton'

const Home = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View className="w-full justify-center items-center h-full px-4 my-6">
        <Text className="text-3xl text-white font-bold text-center">Hello,</Text>
        <CustomButton
          title="Start"
          handlePress={() => {router.push('/gamePlay')}}
          containerStyles="w-full mt-7" 
        />
        <CustomButton
          title="test"
          handlePress={() => {router.push('/test')}}
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

const styles = StyleSheet.create({
  scrollViewContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Home