import { View, Text, ScrollView, Alert, StatusBar } from 'react-native'
import { useState } from 'react'
import { router } from 'expo-router'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'

import { Link } from 'expo-router'
import { login } from '../../lib/axiosAPI/auth'
import { storeUser } from '../../lib/local/manageUser'
import { getScore } from '../../lib/axiosAPI/score'
import { useGlobalContext } from '../../context/GlobalProvider';
import Logo from '../../components/Logo'


const SignIn = () => {
  const {setUser} = useGlobalContext()
  const [form, setForm] = useState({
    username: '',
    password: ''
  })

  const [isSubmitting, setisSubmitting] = useState(false)

  const submit = async () => {
    if(!form.username || !form.password) {
      Alert.alert('error','fill all the fields')
      return
    }
    setisSubmitting(true);

    try {
      const result = await login(form.username, form.password)
      if(result.status === 200){
        Alert.alert(result.message)

        const score = await getScore(result.user_id)

        await storeUser(result.user_id, form.username, form.password, score[0].score)

        const value = {
          user_id: result.user_id,
          username: form.username,
          password: form.password,
          score: score[0].score
        }
        setUser(value)

        router.replace('/home')
      }
      else{
        Alert.alert(result.message)
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

          <Text className="text-2xl text-white mt-10 font-semibold">Log in to Fruity</Text>
          
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
            <Link href="/sign-up" className="text-lg font-psemibold text-secondary">Register</Link>

          </View>
          <StatusBar backgroundColor='#161622'
            style='light'
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn