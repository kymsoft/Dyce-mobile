import { Text, View, TouchableOpacity, Platform, ActivityIndicator, StyleSheet} from 'react-native'
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
      {isLoading ? <ActivityIndicator size="small" color="#FFF" /> : <Text className={`text-primary text-white text-sm ${textStyles}`} style={styles.font}>{title}</Text>}
      
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  font: {
    fontFamily: "Nunito",
  },
});


