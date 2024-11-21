import { StyleSheet, Text, View, SafeAreaView, ScrollView, ImageBackground, Image } from 'react-native'
import { useState, useCallback } from 'react'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { router, Link, useFocusEffect} from 'expo-router';

import CustomButton from '../../components/CustomButton';
import XPBar from '../../components/XpBar';
import { removeUser } from '../../lib/local/manageUser';
import { useGlobalContext } from '../../context/GlobalProvider';
import { xpTable } from '../../constants/xpTable';

import { images } from '../../constants';


const Profile = () => {
  const {user, progress, setIsLoggedIn} = useGlobalContext();
  const [currentXP, setCurrentXP] = useState(progress.xp); 
  const [requiredXP, setRequiredXP] = useState(0); 
  const [avatar, setAvatar] = useState(images.seedling)
  const [title, setTitle] = useState("Seedling")

  useFocusEffect(
    useCallback(() => {
        setUp();
      },
      [],)
  )

  const setUp = async () => {
    
    if (progress.level >= 4 && progress.level < 8) {
      setAvatar(images.sprout);
      setTitle("Sprout");
    } else if (progress.level >= 8 && progress.level < 12) {
      setAvatar(images.sapling);
      setTitle("Sapling");
    } else if (progress.level >= 12 && progress.level < 16) {
      setAvatar(images.tree);
      setTitle("Tree");
    } else if (progress.level >= 16) {
      setAvatar(images.oldGrowth);
      setTitle("Old Growth");
    } else {
      setAvatar(images.seedling);
      setTitle("Seedling");
    }

    setCurrentXP(progress.xp);
    const level = progress.level + 1
    setRequiredXP(xpTable[level]);
  }

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
      <ImageBackground source={images.backGround} resizeMode="cover" className="h-full">
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View className="w-full justify-center items-center h-full px-4 my-6">
          <Text className="text-3xl text-secondary-200 font-pbold text-center pt-16">Hello, {user.username}</Text>

          <Image
            source={avatar}
            className="max-w-[100px] w-full h-[100px]"
            resizeMode="contain"
          />
          <Text className="text-2xl text-[#5AC460] font-bold text-center">{title}</Text>

          <XPBar currentXP={currentXP} requiredXP={requiredXP} currentLevel={progress.level} incrementXP={0}/>

          <Text className="text-xl text-secondary font-pbold text-left w-full pt-4">Your stats :</Text>
          <View className="flex-row justify-between items-center w-full">
            <View className="w-1/2 items-center flex-col">
                <Text className="text-[#8BC0F2] text-lg font-pmedium mx-1 self-start">
                    Total answered
                </Text>
                <Text className="text-[#8BC0F2] text-lg font-pmedium mx-1 self-start">
                    {progress.total_answered}
                </Text>
                <Text className="text-[#5AC460] text-lg font-pmedium mx-1 self-start pt-4">
                    Right answers
                </Text>
                <Text className="text-[#5AC460] text-lg font-pmedium mx-1 self-start">
                    {progress.right_answers}
                </Text>
                <Text className="text-[#DE5550] text-lg font-pmedium mx-1 self-start pt-4">
                    Wrong answers
                </Text>
                <Text className="text-[#DE5550] text-lg font-pmedium mx-1 self-start">
                    {progress.total_answered - progress.right_answers}
                </Text>
            </View>
            <View className="w-1/2 items-center flex-col">
              <View className="items-center">
                  <Text className="text-[#FFFFFF] text-lg font-pmedium mx-1 self-center">
                      Score
                  </Text>
                  <Text className="text-[#FFFFFF] text-lg font-pmedium mx-1 self-center">
                      {progress.score}
                  </Text>
              </View>
              <View className="items-center pt-6">
                  <Text className="text-[#c146e0] text-lg font-pmedium mx-1 self-center">
                      Accuracy
                  </Text>
                  <Text className="text-[#c146e0] text-lg font-pmedium mx-1 self-center">
                    {progress.total_answered > 0 ? Math.round((progress.right_answers / progress.total_answered) * 100) :  progress.right_answers} %
                  </Text>
              </View>
            </View>
          </View>

          <CustomButton
            title="Log out"
            handlePress={logOut}
            containerStyles="w-full mt-7" 
          />
          <View className="flex-row justify-center items-center pt-4">
            <Text className="text-sm text-white font-pbold">If you want to delete your account, </Text>
            <Link href="/deleteAccount" className="text-sm text-red-500 underline font-pbold">click here</Link>
          </View>
        </View>
        <StatusBar backgroundColor='#EFCFE3'
            style='light'
          />
      </ScrollView>
      </ImageBackground>
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