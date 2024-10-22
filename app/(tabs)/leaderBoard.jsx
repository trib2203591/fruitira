import React, { useState, useCallback } from 'react';
import { SafeAreaView, View, Text, FlatList, ActivityIndicator, RefreshControl, StatusBar, ImageBackground } from 'react-native';
import { useFocusEffect } from 'expo-router'

import { getLeaderboard } from '../../lib/axiosAPI/score'; 
import { useGlobalContext } from '../../context/GlobalProvider'

import { images } from '../../constants';

const LeaderboardScreen = () => {
  const {user} = useGlobalContext();
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
        fetchLeaderboard();
      },
      [],)
  )

  const fetchLeaderboard = async () => {
    setRefreshing(true);  
    try {
      const result = await getLeaderboard(); // Call to fetch leaderboard data
      setLeaderboard(result); // Assuming the API returns an array of user data
    } catch (error) {
      setError("Error fetching leaderboard");
      console.error("Error fetching leaderboard:", error);
    } finally {
      setRefreshing(false);
      setIsLoading(false);
    }
  };

  const renderItem = ({ item, index }) => {
    let rankColor;
    let backgroundColor;

    if (index === 0) {
      rankColor = 'text-yellow-500'; 
      backgroundColor = 'bg-yellow-200 border-yellow-300 border-4';
    } else if (index === 1) {
      rankColor = 'text-gray-400'; 
      backgroundColor = 'bg-gray-200 border-gray-300 border-4'; 
    } else if (index === 2) {
      rankColor = 'text-orange-500';
      backgroundColor = 'bg-orange-200 border-orange-300 border-4';
    } else {
      rankColor = 'text-base';
      backgroundColor = 'bg-white opacity-90'; 
    }
    return (
    <View className={`${backgroundColor} w-full my-2 p-4 rounded-lg shadow`}>
      <View className="flex-row justify-between items-center">
        <Text className={`${rankColor} left-6 font-bold text-lg`}>{index + 1}</Text>
        {user.username === item.username ? 
          <View className="flex-row items-center">
            <Text className={`text-base font-pmedium`}>{item.username}</Text>
            <Text className={`text-blue-500 font-pmedium`}>(You)</Text>
          </View>
            : 
          <Text className={`text-base font-pmedium`}>{item.username}</Text>}
        <Text className={"right-6 text-base font-bold text-green-500"}>{item.score}</Text>
      </View>
    </View>
    );
  }

  if (isLoading) {
    return (
      <SafeAreaView className="bg-primary justify-center items-center flex-1">
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="bg-primary justify-center items-center flex-1">
        <Text className="text-white text-3xl">{error}</Text>
      </SafeAreaView>
    );
  }

  const ListHeader = () => (
    <View className="bg-secondary rounded-lg shadow p-4 border-4 border-secondary-100">
            <Text className="text-3xl text-white font-bold text-center">Leaderboard</Text>
            <View className="flex-row justify-between mt-4 p-2 rounded-lg">
              <Text className="text-lg text-white font-bold">Rank</Text>
              <Text className="text-lg text-white font-bold">Username</Text>
              <Text className="text-lg text-white font-bold">Score</Text>
            </View>
          </View>
  )
    return (
      <SafeAreaView className="bg-primary h-full pb-[25px]">
        <ImageBackground source={images.backGround} resizeMode="cover" className="h-full w-full">
        <View className="w-full justify-center items-center h-full px-4 my-6">
          

          <FlatList
          data={leaderboard}
          renderItem={renderItem}
          ListHeaderComponent={ListHeader}
          keyExtractor={(item) => item.user_id} 
          className = "w-full pt-[10px]"
          ListEmptyComponent={() => <Text className="text-center text-lg mt-4 text-gray-500">No leaderboard data available.</Text>}
          refreshControl={
            <RefreshControl
              refreshing={refreshing} 
              onRefresh={fetchLeaderboard} 
              tintColor="#0000ff" 
            />}
          />
        </View>
      
        <StatusBar backgroundColor='#9cdcfe'
            style='light'
          />
      </ImageBackground>
    </SafeAreaView>
    );
};


export default LeaderboardScreen;
