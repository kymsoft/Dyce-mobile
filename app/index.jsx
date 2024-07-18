import { Image, ScrollView, Text, View, StyleSheet, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import {CustomButton} from '../components/CustomButton'
import useAuthStatus from '../constants/authstatus'

export default function App() {
  const { isLoggedIn} = useAuthStatus();

  const existingUser =() => {

    if(isLoggedIn){
      router.push('/home')
    } else {
      router.push('/sign-in')
    }
  }
  return (
    <SafeAreaView className="bg-primary h-full" style={styles.container}>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image
            source={images.logoTen}
            className="w-[150px] h-[150px]"
            resizeMode="contain"
          />
          {/* <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          /> */}
          <View className="relative">
            <Text className={Platform.OS === 'ios' ? "text-3xl text-white text-semibold mt-10 text-center": "text-xl text-white text-bold mt-10 text-center"}>
              Enjoy Seamless and Secure{"\n"}Payment with{" "}
              <Text className="text-[#9E00FF]">Tenet</Text>
            </Text>
          </View>


          <CustomButton 
            title="Continue with Email"
            handlePress={existingUser}
            containerStyles="w-full mt-20"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light"/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    fontFamily: "KumbhSans"
  }
})
