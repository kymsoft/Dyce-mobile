import { Text, View, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { images } from '@/constants'
import { TabBarIcon } from './navigation/TabBarIcon'

export function FormField({title, value, placeholder, handleChangeText, otherStyles, ...props }) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100">{title}</Text>

      <View 
        className="border-2 border-black-200 w-full h-12 px-4 bg-black-100
         rounded-2xl focus:border-[#3E006E] items-center flex-row"
      >
        <TextInput
          className="flex-1 text-white text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor='#7b7b8b'
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
          // keyboardType={title === "Phone Number" && 'phone-pad'}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <TabBarIcon name={!showPassword ? 'eye-sharp' : 'eye-off-sharp'} className="text-gray-100" />

          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  font: {
    fontFamily: "Nunito",
  },
});


