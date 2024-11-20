import { View, Text } from 'react-native'
import { Image } from 'react-native'
import React from 'react'

const CustomCard = ({title, containerStyles, textStyles, isLoading, image}) => {
  return (
    <View className={`bg-pink-300 rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}>
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>{title}</Text>
      {image && (
        <Image
          source={image}
          className="max-w-[50px] w-full h-[50px]"
          resizeMode="contain"
        />
      )}
    </View>
  )
}

export default CustomCard