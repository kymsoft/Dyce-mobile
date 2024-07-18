import {
  Alert,
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import { FormField } from "@/components/FormField";
import { CustomButton } from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const auth = FIREBASE_AUTH;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!username || !email || !password || !phonenumber) {
      Alert.alert("Error", "Please fill in all the fields");
    }
    const dateOfCreation = new Date;

    setIsSubmitting(true);

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", "something went wrong");
    } finally {
      setIsSubmitting(false);
    }

    const doc =await addDoc(collection(FIRESTORE_DB, 'users'), {email: email, username: username, phonenumber: phonenumber})
      .then(() => {
        console.log("User Created")
      })
      .catch((error) => {
        console.log("Error:", error)
      })
      .finally(() => {
        router.push('/home')
      })
  };

  return (
    <SafeAreaView className="bg-[#070A0F] h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Text className="text-xl text-white text-semibold mt-10 text-center">
            Sign Up to Tenet
          </Text>

          <FormField
            title="Username"
            value={username}
            handleChangeText={(text) => setUsername(text)}
            otherStyles="mt-7"
          />
          <FormField
            title="Email"
            value={email}
            handleChangeText={(text) => setEmail(text)}
            otherStyles="mt-4"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={password}
            handleChangeText={(text) => setPassword(text)}
            otherStyles="mt-4"
          />
          <FormField
            title="Phone Number"
            value={phonenumber}
            handleChangeText={(text) => setPhoneNumber(text)}
            otherStyles="mt-4"
            keyboardType="phone-pad"
          />

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text
              className={
                Platform.OS === "ios"
                  ? "text-gray-100 text-lg"
                  : "text-gray-100 text-md"
              }
            >
              Already have an account?
            </Text>
            <Link
              href="/sign-in"
              className={
                Platform.OS === "ios"
                  ? "text-lg text-[#9E00FF]"
                  : "text-md text-[#9E00FF]"
              }
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
