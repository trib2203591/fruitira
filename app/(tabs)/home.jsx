import { View, Text,SafeAreaView, ScrollView, StatusBar, StyleSheet, ImageBackground, Image, TouchableOpacity, Modal } from 'react-native'
import { useState } from 'react'
import { useCallback } from 'react'
import { useFocusEffect, router } from 'expo-router'

import CustomButton from '../../components/CustomButton'
import Logo from '../../components/Logo'
import { images } from '../../constants'

import { useGlobalContext } from '../../context/GlobalProvider'
import { CalculateNewProgress } from '../../lib/local/calculateNewProgress'


const Home = () => {
  const {user, progress, setProgress} = useGlobalContext();
  const [modalVisible, setModalVisible] = useState(true);
  const showPopup = () => setModalVisible(true);
  const hidePopup = () => setModalVisible(false);
  useFocusEffect(
    useCallback(() => {
      },
      [],)
  )
  return (
    <SafeAreaView className="bg-primary h-full">
    <ImageBackground source={images.backGround} resizeMode="cover" className="h-full">
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View className="w-full justify-center items-center h-full px-4 my-6">
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={hidePopup}
      >
        <View className="flex-1 bg-black/50 justify-center items-center">
          <View className="w-80 bg-white rounded-lg p-6 shadow-lg">
            <Text className="text-xl font-bold text-gray-800 mb-4">Level up!</Text>
            <Text className="text-gray-600 text-center mb-6">
              You have reached level {progress.level}!
            </Text>
{/*             <Text className="text-gray-600 text-center mb-6">
              You have reached level {progress.level}!
            </Text>
            <Text className="text-gray-600 text-center mb-6">
              You have reached level {progress.level}!
            </Text> */}
            <TouchableOpacity 
              className="bg-purple-600 px-6 py-3 rounded-lg" 
              onPress={hidePopup}
            >
              <Text className="text-white text-lg font-semibold text-center">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
        <Logo/>
        <Text className="text-2xl text-secondary-200 mt-5 font-psemibold">Your score: {progress.score}</Text>
        <CustomButton
          title="Easy"
          handlePress={showPopup}
          containerStyles="w-[269px] h-[125px] mt-7"
          textStyles="font-psemibold text-3xl" 
        />
        <CustomButton
          title="Easy"
          handlePress={() => {router.push({ pathname: '/gamePlay', params: { dif : 1} })}}
          containerStyles="w-[269px] h-[125px] mt-7"
          textStyles="font-psemibold text-3xl" 
        />
        
        {progress.level > 5 ? 
          <CustomButton
            title="Medium"
            handlePress={() => {router.push({ pathname: '/gamePlay', params: { dif : 2} })}}
            containerStyles="w-[269px] h-[125px] mt-7"
            textStyles="font-psemibold text-3xl" 
          />
            : 
          <View className="w-full  h-[125px] rounded-xl items-center justify-center mt-7">

            <CustomButton
              title="Medium"
              containerStyles="w-[269px] h-[125px] opacity-50"
              textStyles="font-psemibold text-3xl" 
            />
            <Image
            source={images.lock}
            className="absolute left-[10%] max-w-[75px] w-full h-[75px]"
            resizeMode="contain"
            />
            <Text className="absolute left-[30%] text-[#c3f5fa] text-base font-pbold pt-10">
                Reach level 6 to unlock
            </Text>
          </View>
        }

        {progress.level > 10 ? 
          <CustomButton
            title="Hard"
            handlePress={() => {router.push({ pathname: '/gamePlay', params: { dif : 3} })}}
            containerStyles="w-[269px] h-[125px] mt-7"
            textStyles="font-psemibold text-3xl" 
          />
            : 
          <View className="w-full  h-[125px] rounded-xl items-center justify-center mt-7">

            <CustomButton
              title="Hard"
              containerStyles="w-[269px] h-[125px] opacity-50"
              textStyles="font-psemibold text-3xl" 
            />
            <Image
            source={images.lock}
            className="absolute left-[10%] max-w-[75px] w-full h-[75px]"
            resizeMode="contain"
            />
            <Text className="absolute left-[30%] text-[#c3f5fa] text-base font-pbold pt-10">
                Reach level 11 to unlock
            </Text>
          </View>
        }
      </View>
      
      <StatusBar backgroundColor='#EFCFE3'
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