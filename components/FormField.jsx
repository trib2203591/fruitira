import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import {React, useState} from 'react'

import { icons } from '../constants'

const FormField = ({title, value, placeholder, handleChangeText, otherStyles, ...props}) => {
    const [showPassword, setshowPassword] = useState(false)

    return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-secondary-200 font-pmedium">{title}</Text>
      
      <View className="min-w-full h-16 px-4 bg-slate-100 border-2 border-slate-200 rounded-2xl focus:border-secondary-100 items-center flex-row">
        <TextInput className="flex-1 text-secondary-200 font-psemibold text-base"
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#006DBA"
            onChangeText={handleChangeText}
            secureTextEntry={(title === 'Password' || title === 'Confirm password') && !showPassword} 
            autoCapitalize="none"
        />
        {(title === 'Password' || title === 'Confirm password') && (
            <TouchableOpacity onPress={() =>
                setshowPassword(!showPassword)
                }
            >
                <Image source={!showPassword ? icons.eye : icons.eyeHide}
                    className="w-6 h-6"
                    resizeMode='contain'
                />
            </TouchableOpacity>
        )}

      </View>   
    </View>
  )
}

export default FormField