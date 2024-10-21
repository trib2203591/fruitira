import { View, Text } from 'react-native'
import React from 'react'

const Logo = (textStyles) => {
  return (
    <View className="flex-row pt-6 justify-center items-center">
        <Text className={`font-psemibold text-4xl text-[#E64996] ${textStyles}`}>F</Text>
        <Text className={`font-psemibold text-4xl text-[#6591FF] ${textStyles}`}>r</Text>
        <Text className={`font-psemibold text-4xl text-[#FF9053] ${textStyles}`}>u</Text>
        <Text className={`font-psemibold text-4xl text-[#2CC884] ${textStyles}`}>i</Text>
        <Text className={`font-psemibold text-4xl text-[#AF6EDF] ${textStyles}`}>t</Text>
        <Text className={`font-psemibold text-4xl text-[#FCEF00] ${textStyles}`}>y</Text>
    </View>
  )
}

export default Logo