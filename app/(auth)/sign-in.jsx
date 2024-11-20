import { View, Text, ScrollView, Alert, StatusBar, ImageBackground } from 'react-native'
import { useState } from 'react'
import { router } from 'expo-router'
import { Link } from 'expo-router'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { images } from '../../constants'

import { login } from '../../lib/firebase/auth'
import { GetUserProgress } from '../../lib/firebase/progress'
import { GetUserDoc } from '../../lib/firebase/user'
import { storeUser, getUser } from '../../lib/local/manageUser'
import { StoreProgressLocal } from '../../lib/local/manageProgress'
import { useGlobalContext } from '../../context/GlobalProvider';
import Logo from '../../components/Logo'


const SignIn = () => {
  const {setUser, setProgress} = useGlobalContext()
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [isSubmitting, setisSubmitting] = useState(false)

  const submit = async () => {
    if(!form.email || !form.password) {
      Alert.alert('error','fill all the fields')
      return
    } 
    setisSubmitting(true);

    try {
        const result = await login(form.email, form.password)
        const userInfo = await GetUserDoc(result);
        await storeUser(result, userInfo.username, form.password);
        const user = await getUser();
        await setUser(user);
        const progress = await GetUserProgress(result);
        await StoreProgressLocal(progress);
        setProgress(progress);
        router.replace('/home');
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally {
        setisSubmitting(false)
      }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ImageBackground source={images.backGround} resizeMode="cover" className="h-full">
      <ScrollView>
        <View className="w-full justify-center items-center h-full px-4 my-6">
          <Logo />

          <Text className="text-2xl text-secondary-200 mt-10 font-semibold">Log in to Fruity</Text>
          
          <FormField title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({...form, email: e})}
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
            <Link href="/sign-up" className="text-lg font-psemibold text-secondary-200">Register</Link>

          </View>
        </View>
        <StatusBar backgroundColor='#EFCFE3'
            style='dark'
          />
      </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default SignIn