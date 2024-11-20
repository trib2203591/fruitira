import React from 'react';
import { View, Text } from 'react-native';
import { useState, useEffect } from 'react';

const XPBar = ({ currentXP, requiredXP, currentLevel, incrementXP }) => {
    const [showXPText, setShowXPText] = useState(false);
    const progress = Math.min(Math.max(currentXP / requiredXP, 0), 1);; 

    useEffect(() => {
        setShowXPText(true);
        setTimeout(() => setShowXPText(false), 400);
      }, [currentXP, requiredXP, currentLevel]);

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
            {showXPText && (
                <View className="absolute top-[47%] right-[10%]">
                    <Text className="text-green-600 text-lg font-semibold">+{incrementXP} XP</Text>
                </View>
            )}
        </View>
    );
};

export default XPBar;