import { Text, View, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { images } from '@/constants'
import { TabBarIcon } from './navigation/TabBarIcon'

export function SearchField({title, value, placeholder, handleChangeText, otherStyles, ...props }) {

  return (

      <View 
        className="border-2 border-black-200 w-full h-12 px-4 bg-black-100
         rounded-2xl focus:border-[#A8159A] items-center flex-row"
      >
        <TabBarIcon name="search" className="text-gray-100 mr-2 text-md"/>
        <TextInput
          className="flex-1 text-white text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor='#7b7b8b'
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
        />
        <TouchableOpacity className="">
              <TabBarIcon
                name="calendar"
                className=" text-white text-md"
              />
            </TouchableOpacity>
      </View>
  )
}

const styles = StyleSheet.create({
  font: {
    fontFamily: "Nunito",
  },
});


