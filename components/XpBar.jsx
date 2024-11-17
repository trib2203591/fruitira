import React from 'react';
import { View, Text } from 'react-native';

const XPBar = ({ currentXP, requiredXP, currentLevel}) => {
    const progress = Math.min(Math.max(currentXP / requiredXP, 0), 1);; 

    return (
        <View className="items-center mt-1 w-full">
            <View className="w-full justify-between flex-row">
                <Text className="text-[#5AD176] text-lg font-pmedium mx-1 self-start">
                    Lv. {currentLevel}
                </Text>
            </View>

            <View className="w-full border-2 border-[#66E9F7] h-10 rounded-xl items-start justify-center">
                <View
                className="h-8 bg-[#B3DEE2] rounded-lg mx-[2px] justify-center items-start"
                style={{ width: `${progress * 100}%` }}
                />
                <Text className="absolute left-[5%] text-white text-sm font-pmedium">
                    XP: {currentXP}/{requiredXP}
                </Text>
            </View>
        </View>
    );
};

export default XPBar;