import { View, Text } from 'react-native'
import React from 'react'

const Logo = (textStyles) => {
  return (
    <View className="flex-row pt-6 justify-center items-center">
        <Text className={`font-psemibold text-4xl text-[#E27396] ${textStyles}`}>F</Text>
        <Text className={`font-psemibold text-4xl text-[#8BC0F2] ${textStyles}`}>r</Text>
        <Text className={`font-psemibold text-4xl text-[#FFAD7E] ${textStyles}`}>u</Text>
        <Text className={`font-psemibold text-4xl text-[#88DAA0] ${textStyles}`}>i</Text>
        <Text className={`font-psemibold text-4xl text-[#D899DF] ${textStyles}`}>t</Text>
        <Text className={`font-psemibold text-4xl text-[#FCEF00] ${textStyles}`}>y</Text>
    </View>
  )
}

export default Logo