import React, { useState, useRef, useEffect } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";

const AXPBar = ({ currentLevel, currentXP, requiredXP, incrementXP }) => {
  const [showXPText, setShowXPText] = useState(false);
  const progress = Math.min(Math.max(currentXP / requiredXP, 0), 1);; 

  // Trigger animation whenever `currentXP` changes
  useEffect(() => {
    setShowXPText(true);
    setTimeout(() => setShowXPText(false), 400);
  }, [currentXP, requiredXP, currentLevel]);

  return (
    <View className="items-center w-80">
      <View className="w-full justify-between flex-row">
        <Text className="text-[#5AD176] text-lg font-pmedium mx-1 self-start">
          Lv. {currentLevel}
        </Text>
      </View>
      <View className="w-80 h-10 border-[#66E9F7] border-2 rounded-xl overflow-hidden relative justify-center">
        <View
          className="h-8 bg-[#B3DEE2] rounded-lg mx-[2px] justify-center items-start"
          style={{ width: `${progress * 100}%` }}
        />
        <Text className="mt-2 text-white text-sm font-pmedium absolute left-[5%]">
          {currentXP} / {requiredXP} XP
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

export default AXPBar;