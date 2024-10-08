import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar';

const gameLayout = () => {
  return (
    <>
    <Stack>
        <Stack.Screen name="gamePlay" options={{headerShown: false}} />
    </Stack>

    <StatusBar backgroundColor='#000000' style='inverted'/>
    </>
  )
}

export default gameLayout