import { View, Text, SafeAreaView, ScrollView, StatusBar, Alert, ImageBackground } from 'react-native'
import { useState, useEffect } from 'react'
import { router } from 'expo-router'

import CustomCard from '../../components/CustomCard'
import CustomButton from '../../components/CustomButton'
import { images } from '../../constants'

import { getGame } from '../../lib/axiosAPI/game'
import { useGlobalContext } from '../../context/GlobalProvider';
import { updateScore } from '../../lib/local/manageScore'

const gamePlay = () => {
  const {user, setUser} = useGlobalContext()
  const [options, setOptions] = useState(null)
  const [question, setQuestion] = useState(null)
  const [answer, setAnswer] = useState(null)
  const [playing, setPlaying] = useState(true)
  const [score, setScore] = useState(user.score)

  useEffect(() => {
    start()
  }, [])

  const start = async () => {
    try {
      let result = await getGame();
      result = result.data;
  
      if(question){
        while(result.question.question_id === question.question_id){ 
          result = await getGame();
          result = result.data;
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
    }  
  }

  const selectAnswer = (select) => {
    setAnswer(select)
  }

  const checkAnswer = () => {
    if (answer.key_id === question.key_id) {
      setScore(score + 1)
      updateScore(score + 1)
      setUser({...user, score: score+1})
    } else {
      if(score > 0) {
        setScore(score - 1)
        updateScore(score - 1)
        setUser({...user, score: score-1})
      }
    }
    
    setPlaying(false)
  }

  const getButtonColor = (option) => {
    if (!playing) {
      if (option.key_id === question.key_id) {
        return 'bg-[#8EFF9A]'
      }
      if (option.key_id === answer.key_id && answer.key_id !== question.key_id) {
        return 'bg-[#FF7B7E]' 
      }
    }
    return answer === option ? 'bg-secondary-100' : 'bg-[#bdbdbd]' 
  }

  return (
    <SafeAreaView className="bg-primary h-full ">
    <ImageBackground source={images.backGround} resizeMode="cover" className="h-full">
    <ScrollView>
      <View className="w-full justify-center items-center h-dvh px-4 my-6">
        <View className="w-full mt-5 flex-row items-center justify-between">
          <CustomButton title="< Back" textStyles={'text-sm text-secondary-200'} containerStyles={'bg-transparent w-[50px] h-[20px'} handlePress={() => router.replace('/home') }/>
          <Text className="text-2xl text-secondary-200 font-psemibold absolute left-[33%]">score: {score}</Text>
        </View>

        {question?
        <CustomCard title={question.word} containerStyles="w-full mt-3 h-[250px] bg-[#EA9AB2]" textStyles="text-center text-4xl font-pbold text-white" isLoading={false} />
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
              textStyles={'text-xl'}
            />
            <CustomButton
              title={options[1].key}
              handlePress={() => selectAnswer(options[1])}
              containerStyles={`flex-1 ml-1 h-full ${getButtonColor(options[1])}`}
              isLoading={playing? false: true}
              textStyles={'text-xl'}
            />
          </View>
          <View className="flex-row justify-center items-center mt-2 h-[125px]">
            <CustomButton
              title={options[2].key}
              handlePress={() => selectAnswer(options[2])}
              containerStyles={`flex-1 mr-1 h-full ${getButtonColor(options[2])}`}
              isLoading={playing? false: true}
              textStyles={'text-xl'}
            />
            <CustomButton
              title={options[3].key}
              handlePress={() => selectAnswer(options[3])}
              containerStyles={`flex-1 ml-1 h-full ${getButtonColor(options[3])}`}
              isLoading={playing? false: true}
              textStyles={'text-xl'}
            />
          </View>
        </>
        ):(
        <CustomCard title="No options available" containerStyles="w-full mt-7 h-[250px]" textStyles="text-center" isLoading={true} />
      )}
        
        {playing ? (
          <CustomButton title="Check" handlePress={checkAnswer} isLoading={answer? false: true} containerStyles="h-[50px] w-full mt-6 bg-secondary-200"/>
        ):(
          <CustomButton title="Next" handlePress={start} containerStyles="h-[50px] w-full mt-6 bg-secondary-200"/>
        )}

      </View>
      <StatusBar backgroundColor='#9cdcfe'
            style='light'
          />
    </ScrollView>
    </ImageBackground>
  </SafeAreaView>
  )
}

export default gamePlay