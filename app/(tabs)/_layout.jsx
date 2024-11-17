import { View, Text, Image } from 'react-native';
import { Tabs, Redirect } from 'expo-router';

import { icons } from '../../constants';

const TabIcon = ({ icon, color, name, focused }) => {
    return (
        <View className="items-center justify-center gap-2 w-24">
            <Image
                source={icon}
                resizeMode="contain"
                tintColor={color}
                className="w-6 h-6 "
            />
            <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs `}
                style={{color: color}}
            >
                {name}
            </Text>
        </View>
    )
}

const TabsLayout = () => {
  return (
    <>
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#E27396',
                tabBarInactiveTintColor: '#ffffff',
                tabBarStyle: {
                    backgroundColor: '#EFCFE3',
                    borderTopWidth: 1,
                    borderTopColor: '#EAF2D7',
                    height: 81,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 20, 
                }
            }}
        >
            <Tabs.Screen 
                name="leaderBoard"  
                options={{
                    tile: 'Leader Board',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                        icon={icons.bookmark}
                        color={color}
                        name="Leader Board"
                        focused={focused}
                        />
                    )
                }}
            />
            <Tabs.Screen 
                name="home"  
                options={{
                    tile: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                        icon={icons.play}
                        color={color}
                        name="Play"
                        focused={focused}
                        />
                    )
                }}
            />
            <Tabs.Screen 
                name="profile"  
                options={{
                    tile: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                        icon={icons.profile}
                        color={color}
                        name="Profile"
                        focused={focused}
                        />
                    )
                }}
            />
        </Tabs>
    </>
  )
}
  
export default TabsLayout