import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { useState } from 'react'
import { router } from 'expo-router'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'

import { deleteAccount } from '../../lib/axiosAPI/auth'
import { useGlobalContext } from '../../context/GlobalProvider';
import Logo from '../../components/Logo'


const delAccount = () => {
  const {user} = useGlobalContext()
  const [form, setForm] = useState({
    password: '',
    re_password: ''
  })

  const [isSubmitting, setisSubmitting] = useState(false)

  const submit = async () => {
    if(!form.re_password || !form.password) {
      Alert.alert('error','fill all the fields')
      return
    }
    else if(form.re_password !== form.password) {
      Alert.alert('error', "passwords don't match")
      return
    }
    setisSubmitting(true);

    try {
      const result = await deleteAccount(user.username, form.password)
      if(result.status === 200){
        Alert.alert('Account deleted')
        router.replace('/sign-in')
      }
      else{
        Alert.alert('Wrong password')
      }
    } catch (error) {
      Alert.alert('error', error.message)
    } finally {
      setisSubmitting(false)
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center items-center h-full px-4 my-6">
          <Logo />

          <Text className="text-2xl text-white mt-10 font-semibold">Delete your account</Text>
          
          <FormField title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({...form, password: e})}
            otherStyles="mt-7"
          />

          <FormField title="Confirm password"
            value={form.re_password}
            handleChangeText={(e) => setForm({...form, re_password: e})}
            otherStyles="mt-7"
          />
          <CustomButton title="Delete Account"
            handlePress={submit} 
            containerStyles="mt-7 w-full bg-red-500"
            isLoading={isSubmitting}
            textStyles="text-white font-psemibold"
          />

        </View>
        <StatusBar backgroundColor='#161622'
            style='light'
          />
      </ScrollView>
    </SafeAreaView>
  )
}

export default delAccount