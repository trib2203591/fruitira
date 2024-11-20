import { View, Text, SafeAreaView, ScrollView, StatusBar, Alert, ImageBackground, TouchableOpacity, Modal } from 'react-native'
import { useLocalSearchParams } from 'expo-router/build/hooks'
import { useState, useEffect } from 'react'
import { router } from 'expo-router'

import CustomCard from '../../components/CustomCard'
import CustomButton from '../../components/CustomButton'
import { images } from '../../constants'

import { getGame } from '../../lib/firebase/game'
import { useGlobalContext } from '../../context/GlobalProvider'
import { UpdateProgressLocal } from '../../lib/local/manageProgress'
import { UpdateProgressInDb } from '../../lib/firebase/progress'
import { CalculateNewProgress } from '../../lib/local/calculateNewProgress'

const gamePlay = () => {
  const data = useLocalSearchParams();
  const {user, progress, setProgress, isLoading, setIsLoading} = useGlobalContext()
  const [progressFactor, setProgressFactor] = useState(null)
  const [options, setOptions] = useState(null)
  const [question, setQuestion] = useState(null)
  const [answer, setAnswer] = useState(null)
  const [playing, setPlaying] = useState(true)
  const [modalVisible, setModalVisible] = useState(false);
  const showPopup = () => setModalVisible(true);
  const hidePopup = () => setModalVisible(false);

  useEffect(() => {
    if(parseInt(data.dif, 10) === 1) {
      setProgressFactor(
        {
          score: 1,
          xp: 5
        }
      );
    }else if(parseInt(data.dif, 10) === 2) {
      setProgressFactor(
        {
          score: 2,
          xp: 10
        }
      );
    }else if(parseInt(data.dif, 10) === 3) {
      setProgressFactor(
        {
          score: 3,
          xp: 20
        }
      );
    }
    console.log(progressFactor);
    start()
  }, [])

  const start = async () => {
    setIsLoading(true);
    try {
      let result = await getGame(parseInt(data.dif, 10));
      console.log(result);
  
      if(question){
        while(result.question.id === question.id){ 
          result = await getGame(parseInt(data.dif, 10));
        }
      }
  
      setPlaying(true);
      setAnswer(null);
      setOptions(result.options);
      setQuestion(result.question);
    } catch (error) {
      Alert.alert("Error", "Unable to fetch game data. Please check your connection.");
      setOptions(null);
      setQuestion(null);
      setAnswer(null);
      setPlaying(false);
    } finally {
      setIsLoading(false);
    }  
  }

  const selectAnswer = (select) => {
    setAnswer(select)
  }

  const checkAnswer = async () => {
    var newProgress = null;
    if (answer.id === question.id) {
      newProgress = CalculateNewProgress(progress, true, progressFactor)
    } else {
      newProgress = CalculateNewProgress(progress, false, progressFactor)
    }
    setPlaying(false)
    await updateProgress(newProgress);
  }

  const updateProgress = async (newProgress) => {
    try {
      setIsLoading(true);
      setProgress(newProgress);
      await UpdateProgressLocal(newProgress);
      //await UpdateProgressInDb(user, newProgress);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const getButtonColor = (option) => {
    if (!playing) {
      if (option.id === question.id) {
        return 'bg-[#8EFF9A]'
      }
      if (option.id === answer.id && answer.id !== question.id) {
        return 'bg-[#FF7B7E]' 
      }
    }
    return answer === option ? 'bg-[#B3DEE2]' : 'bg-white' 
  }

  return (
    <SafeAreaView className="bg-primary h-full ">
    <ImageBackground source={images.backGround} resizeMode="cover" className="h-full">
    <ScrollView>
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={hidePopup}
      >
        <View className="flex-1 bg-black/50 justify-center items-center">
          <View className="w-80 bg-white rounded-lg p-6 shadow-lg">
            <Text className="text-xl font-bold text-gray-800 mb-4">Custom Alert</Text>
            <Text className="text-gray-600 text-center mb-6">
              This is a custom popup alert styled with NativeWind!
            </Text>
            <TouchableOpacity 
              className="bg-purple-600 px-6 py-3 rounded-lg" 
              onPress={hidePopup}
            >
              <Text className="text-white text-lg font-semibold text-center">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View className="w-full justify-center items-center h-dvh px-4 my-6">
        <View className="w-full mt-5 flex-row items-center justify-between">
          <CustomButton title="< Back" textStyles={'text-sm text-secondary-200'} containerStyles={'bg-transparent w-[50px] h-[20px'} handlePress={() => router.replace('/home') }/>
          <Text className="text-2xl text-secondary-200 font-psemibold absolute left-[33%]">score: {progress.score}</Text>
        </View>

        {question?
        <CustomCard title={question.question} containerStyles="w-full mt-3 h-[250px] bg-[#EA9AB2]" textStyles="text-center text-4xl font-pbold text-white" isLoading={false} />
        :
        <CustomCard title="No question available" containerStyles="w-full mt-7 h-[250px]" textStyles="text-center" isLoading={true} />
        }

        {options? (
          <>
          <View className="flex-row justify-center items-center mt-6 h-[125px]">
            <CustomButton
              title={options[0].key}
              handlePress={() => selectAnswer(options[0])}
              containerStyles={`flex-1 mr-1 h-full ${getButtonColor(options[0])}`}
              isLoading={playing? false: true}
              textStyles={'text-xl text-[#E27396]'}
            />
            <CustomButton
              title={options[1].key}
              handlePress={() => selectAnswer(options[1])}
              containerStyles={`flex-1 ml-1 h-full ${getButtonColor(options[1])}`}
              isLoading={playing? false: true}
              textStyles={'text-xl text-[#E27396]'}
            />
          </View>
          <View className="flex-row justify-center items-center mt-2 h-[125px]">
            <CustomButton
              title={options[2].key}
              handlePress={() => selectAnswer(options[2])}
              containerStyles={`flex-1 mr-1 h-full ${getButtonColor(options[2])}`}
              isLoading={playing? false: true}
              textStyles={'text-xl text-[#E27396]'}
            />
            <CustomButton
              title={options[3].key}
              handlePress={() => selectAnswer(options[3])}
              containerStyles={`flex-1 ml-1 h-full ${getButtonColor(options[3])}`}
              isLoading={playing? false: true}
              textStyles={'text-xl text-[#E27396]'}
            />
          </View>
        </>
        ):(
        <CustomCard title="No options available" containerStyles="w-full mt-7 h-[250px]" textStyles="text-center" isLoading={true} />
      )}
        
        {playing ? (
          <CustomButton title="Check" handlePress={checkAnswer} isLoading={answer? false: true} containerStyles="h-[50px] w-full mt-6 bg-secondary-200"/>
        ):(
          <CustomButton title="Next" handlePress={start} isLoading={isLoading} containerStyles="h-[50px] w-full mt-6 bg-secondary-200"/>
        )}

      </View>
      <StatusBar backgroundColor='#EFCFE3'
            style='light'
          />
    </ScrollView>
    </ImageBackground>
  </SafeAreaView>
  )
}

export default gamePlay