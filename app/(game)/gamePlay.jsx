import { View, Text, SafeAreaView, ScrollView, StatusBar, Alert } from 'react-native'
import { useState, useEffect } from 'react'

import CustomCard from '../../components/CustomCard'
import CustomButton from '../../components/CustomButton'

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
        return 'bg-green-500'
      }
      if (option.key_id === answer.key_id && answer.key_id !== question.key_id) {
        return 'bg-red-500' 
      }
    }
    return answer === option ? 'bg-blue-500' : 'bg-gray-500' 
  }

  return (
    <SafeAreaView className="bg-primary h-full">
    <ScrollView>
      <View className="w-full justify-center items-center h-dvh px-4 my-6 ">
        <Text className="text-2xl text-white mt-7 font-semibold">score: {score}</Text>
        {question?
        <CustomCard title={question.word} containerStyles="w-full mt-7 h-[250px]" textStyles="text-center text-4xl font-bold" isLoading={false} />
        :
        <CustomCard title="No question available" containerStyles="w-full mt-7 h-[250px]" textStyles="text-center" isLoading={true} />
        }

        {options? (
          <>
          <View className="flex-row justify-center items-center mt-7 h-[125px]">
            <CustomButton
              title={options[0].key}
              handlePress={() => selectAnswer(options[0])}
              containerStyles={`flex-1 mr-1 h-full ${getButtonColor(options[0])}`}
              isLoading={playing? false: true}
            />
            <CustomButton
              title={options[1].key}
              handlePress={() => selectAnswer(options[1])}
              containerStyles={`flex-1 ml-1 h-full ${getButtonColor(options[1])}`}
              isLoading={playing? false: true}
            />
          </View>
          <View className="flex-row justify-center items-center mt-2 h-[125px]">
            <CustomButton
              title={options[2].key}
              handlePress={() => selectAnswer(options[2])}
              containerStyles={`flex-1 mr-1 h-full ${getButtonColor(options[2])}`}
              isLoading={playing? false: true}
            />
            <CustomButton
              title={options[3].key}
              handlePress={() => selectAnswer(options[3])}
              containerStyles={`flex-1 ml-1 h-full ${getButtonColor(options[3])}`}
              isLoading={playing? false: true}
            />
          </View>
        </>
        ):(
        <CustomCard title="No options available" containerStyles="w-full mt-7 h-[250px]" textStyles="text-center" isLoading={true} />
      )}
        
        {playing ? (
          <CustomButton title="Check" handlePress={checkAnswer} isLoading={answer? false: true} containerStyles="h-[50px] w-full mt-7 bg-green-500"/>
        ):(
          <CustomButton title="Next" handlePress={start} containerStyles="h-[50px] w-full mt-7 bg-green-500"/>
        )}

        <StatusBar backgroundColor='#000000' style='inverted'/>
      </View>
    </ScrollView>
  </SafeAreaView>
  )
}

export default gamePlay