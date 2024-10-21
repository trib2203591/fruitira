import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image, ImageBackground} from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import Logo from '../components/Logo';


import { useGlobalContext } from '../context/GlobalProvider';


export default function App() {
  const{isLoading, isLoggedIn} = useGlobalContext();

  if (!isLoading && isLoggedIn) {
    return <Redirect href="/home" />;
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ImageBackground source={images.backGround} resizeMode="cover" className="h-full">
      <ScrollView >
        <View className="w-full justify-center items-center h-full px-4">
          <View className="pt-4"/>
          <Logo />

          <Image
            source={images.fruits}
            className="max-w-[380px] w-full h-[250px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              This is an app for learning fruit vocabularies, named {' '}
              <Text className="text-secondary-200">
                Fruity
              </Text>
            </Text>
          </View>

          <View>
            <Text className="text-sm font-pregular text-white mt-7 text-center">
              A place where fruit and trai cay, and fruit and fruit
            </Text>

          </View>

          <CustomButton
            title="Get started with Email"
            handlePress={() => router.push('/sign-in')}
            containerStyles="w-full mt-7" 
          />
        </View>
        <StatusBar backgroundColor='#9cdcfe'
            style='light'
          />
      </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
//com.crash-course.aora
