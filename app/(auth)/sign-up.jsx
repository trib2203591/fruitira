import { View, Text, ScrollView, Image, Alert, StatusBar, ImageBackground } from 'react-native'
import { useState } from 'react'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { images } from '../../constants'

import { Link, router } from 'expo-router'
import { register } from '../../lib/firebase/auth'
import { GetUserProgress } from '../../lib/firebase/progress'
import { storeUser, getUser } from '../../lib/local/manageUser'
import { StoreProgressLocal } from '../../lib/local/manageProgress'
import { useGlobalContext } from '../../context/GlobalProvider';
import Logo from '../../components/Logo'

const SignUp  = () => {
  const {setUser, setProgress} = useGlobalContext()
  const [form, setForm] = useState({
    confirmPassword: '',
    password: '',
    email: '',
    username: ''
  })

  const [isSubmitting, setisSubmitting] = useState(false)

  const submit = async () => {
    if(!form.confirmPassword || !form.password || !form.email) {
      Alert.alert('Warning','fill all the fields')
    }
    else if(form.confirmPassword !== form.password) {
      Alert.alert('Warning', "passwords don't match")
    }
    else if (form.username.includes(' ') || form.email.includes(' ') || form.password.includes(' ')) {
      Alert.alert('Warning', "fields can't contain spaces")
    }
    else if (form.username.length > 20) {
      Alert.alert('Warning', "username can't be longer than 20 characters")
    }
    else{
      try {
        setisSubmitting(true);
        const result = await register(form.email, form.username, form.password)
        await storeUser(result, form.username, form.password);
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
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ImageBackground source={images.backGround} resizeMode="cover" className="h-full">
      <ScrollView>
        <View className="w-full justify-center items-center h-full px-4 my-6">
          <Logo/>

          <Text className="text-2xl text-secondary-200 mt-10 font-semibold">Create a new account</Text>
          
          <FormField title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({...form, username: e})}
            otherStyles="mt-7"
          />

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
            <Link href="/sign-in" className="text-lg font-psemibold text-secondary-200">Login</Link>

          </View>
        </View>
        <StatusBar backgroundColor='#EFCFE3'
            style='light'
          />
      </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default SignUp