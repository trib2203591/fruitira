import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image, Alert } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import {getCurrentUser, testGetUser, testRemoveUser} from '../lib/local/manageUser';
import { useGlobalContext } from '../context/GlobalProvider';


export default function App() {
  const{isLoading, isLoggedIn} = useGlobalContext();

  if (!isLoading && isLoggedIn) {
    return <Redirect href="/home" />;
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView >
        <View className="w-full justify-center items-center h-full px-4">
          <Image 
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"  
          />

          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              This is a video or images app something, named {' '}
              <Text className="text-secondary-200">
                Aora
              </Text>
            </Text>

            <Image 
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 right-10"
              resizeMode='contain'
            /> 
          </View>

          <View>
            <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
              A place where creativity meets innovation: Embark on a journey of boundless possibility with Aora
            </Text>

          </View>

          <CustomButton
            title="Get started with Email"
            handlePress={() => router.push('/sign-in')}
            containerStyles="w-full mt-7" 
          />

          <CustomButton
            title="test"
            handlePress={testGetUser}
            containerStyles="w-full mt-7" 
          />
          <CustomButton
            title="test2"
            handlePress={getCurrentUser}
            containerStyles="w-full mt-7" 
          />
          <CustomButton
            title="delete"
            handlePress={testRemoveUser}
            containerStyles="w-full mt-7" 
          />

          
          <StatusBar backgroundColor='#000000'
            style='inverted'
          />
          
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
//com.crash-course.aora
