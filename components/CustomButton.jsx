import { Text, View, TouchableOpacity, Platform} from 'react-native'
import React from 'react'

export function CustomButton({title, handlePress, containerStyles, textStyles, isLoading}){
  return (
    <TouchableOpacity 
    onPress={handlePress}
    activeOpacity={0.7}
    className={`bg-[#3E006E] rounded-xl min-h-[50px] 
    justify-center items-center 
    ${containerStyles}`}
    disabled={isLoading}
    >
      <Text className={`text-primary text-white text-sm ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}


