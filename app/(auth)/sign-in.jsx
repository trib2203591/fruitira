import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { useState } from 'react'
import { router } from 'expo-router'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'

import { images } from '../../constants'
import { Link } from 'expo-router'
import { login, test } from '../../lib/auth'
import { storeUser } from '../../lib/manageUser'


const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [isSubmitting, setisSubmitting] = useState(false)

  const submit = async () => {
    if(!form.username || !form.password) {
      Alert.alert('error','fill all the fields, fucking ass')
    }
    setisSubmitting(true);

    try {
      const result = await login(form.username, form.password)
      if(result.status === 200){
        Alert.alert('login OK')
        await storeUser(form.username, form.password)
        router.replace('/home')
      }
      else{
        Alert.alert('wrong username or password')
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
          <Image source={images.logo}
            resizeMode='contain' 
            className="w-[115px] h-[35px]"
          />

          <Text className="text-2xl text-white mt-10 font-semibold">Log in to Aora</Text>
          
          <FormField title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({...form, username: e})}
            otherStyles="mt-7"
          />

          <FormField title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({...form, password: e})}
            otherStyles="mt-7"
          />
          <CustomButton title="Login"
            handlePress={submit} 
            containerStyles="mt-7 w-full"
            isLoading={isSubmitting}
          />

          <View className="justify-center items-center mt-6 pt-2 flex-row gap-2">
            <Text className="text-white">
              Don't have an account?
            </Text>
            <Link href="/sign-up" className="text-lg font-psemibold text-secondary-100">Register</Link>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn