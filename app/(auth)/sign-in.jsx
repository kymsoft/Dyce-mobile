import { Alert, Image, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {FormField} from "@/components/FormField"
import { CustomButton } from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import {FIREBASE_AUTH} from "../../FirebaseConfig"
import { signInWithEmailAndPassword } from 'firebase/auth'

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = FIREBASE_AUTH;

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () =>{
    if( !email || !password){
      Alert.alert('Error', 'Please fill in all the fields')
    }

    setIsSubmitting(true);

    try {
      const response = await signInWithEmailAndPassword(auth, email, password)
      router.replace('/home')
    } catch (error) {
      Alert.alert('Error', "Wrong credentials. Try again")
    } finally{
      setIsSubmitting(false)
    }
    
  }
  return (
    <SafeAreaView className="bg-[#070A0F] h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          
          <Text className="text-xl text-white text-semibold mt-10 text-center" style={styles.font}>Login to your Tenet</Text>

          <FormField 
            title="Email"
            value={email}
            handleChangeText={(text) => setEmail(text)}
            otherStyles="mt-6"
            keyboardType="email-address"
          />
          <FormField 
            title="Password"
            value={password}
            handleChangeText={(text) => setPassword(text)}
            otherStyles="mt-4"
          />

          <CustomButton 
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className={Platform.OS === 'ios' ? "text-gray-100 text-lg": "text-gray-100 text-md"} style={styles.font}>
              Don't have an account?
            </Text>
            <Link href="/sign-up" className={Platform.OS === 'ios' ? "text-lg text-[#9E00FF]": "text-md text-[#9E00FF]"} style={styles.font}>Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn;
const styles = StyleSheet.create({
  font: {
    fontFamily: "Nunito",
  },
});
