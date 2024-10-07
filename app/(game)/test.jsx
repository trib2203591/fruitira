import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { useState, useEffect } from 'react'
import { router } from 'expo-router'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'

import { images } from '../../constants'
import { Link } from 'expo-router'
import { login } from '../../lib/axiosAPI/auth'
import { getGame } from '../../lib/axiosAPI/game'
import { storeUser } from '../../lib/local/manageUser'

const test = () => {
  const [options, setOptions] = useState(null)

  useEffect(() => {
    start()
  }, [])
  

  const start = async () => {
    const result = await getGame()
    setOptions(result.options)
    console.log('-----------')
    console.log(options)
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center items-center h-full px-4 my-6">
          {options ? (
            <Text className="text-3xl text-white font-bold text-center">
              {options[0].key}
              
            </Text>
          ) : (
            <Text className="text-xl text-white font-bold text-center">No options available</Text>
          )}
          <CustomButton title="Start Game" handlePress={start} />
        </View>
      </ScrollView>
    </SafeAreaView>

  )
}

export default test