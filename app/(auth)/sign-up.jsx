import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { useState } from 'react'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'

import { images } from '../../constants'
import { Link, router } from 'expo-router'
import { register } from '../../lib/axiosAPI/auth'
import { storeUser } from '../../lib/local/manageUser'

const SignUp  = () => {
  const [form, setForm] = useState({
    confirmPassword: '',
    password: '',
    username: ''
  })

  const [isSubmitting, setisSubmitting] = useState(false)

  const submit = async () => {
    if(!form.confirmPassword || !form.password || !form.username) {
      Alert.alert('Warning','fill all the fields, fucking ass')
    }
    else if(form.confirmPassword !== form.password) {
      Alert.alert('Warning', "passwords don't match")
    }
    else{
      try {
        const result = await register(form.username, form.password)
        setisSubmitting(true);
        console.log(result.status)
        console.log(result.message)
        if(result.status === 201) {
          Alert.alert('register OK')
          await storeUser(form.username, form.password)
          router.replace('/home');
        }
        else {
          Alert.alert('User already exist, please login')
        }
      } catch (error) {
        Alert.alert('error', error.message)
      } finally {
        setisSubmitting(false)
      }
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

          <FormField title="Confirm password"
            value={form.confirmPassword}
            handleChangeText={(e) => setForm({...form, confirmPassword: e})}
            otherStyles="mt-7"
          />
          <CustomButton title="Register"
            handlePress={submit} 
            containerStyles="mt-7 w-full"
            isLoading={isSubmitting}
          />

          <View className="justify-center items-center mt-6 flex-row gap-2">
            <Text className="text-white">
              Have an account already?
            </Text>
            <Link href="/sign-in" className="text-lg font-psemibold text-secondary-100">Login</Link>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp