import { Text, View, TouchableOpacity, Platform} from 'react-native'
import React from 'react'
import { TabBarIcon } from './navigation/TabBarIcon'
import { router } from 'expo-router'

export function BackButton(){
  return (
    <TouchableOpacity 
    onPress={() => router.back()}
    activeOpacity={0.7}
    
    >
      <TabBarIcon name='arrow-back' className="text-white"/>
    </TouchableOpacity>
  )
}