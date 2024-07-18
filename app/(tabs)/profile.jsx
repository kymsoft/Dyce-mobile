import { Alert, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FIREBASE_AUTH, FIRESTORE_DB } from "@/FirebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { router } from "expo-router";

const Profile = () => {
  const [users, setUsers] = useState([]);
  const user = FIREBASE_AUTH.currentUser.uid;
  const userEmail = FIREBASE_AUTH.currentUser.email;
  useEffect(() => {
    const fetchUser = () => {
      const userRef = collection(FIRESTORE_DB, "users");
      const userSnapShot = onSnapshot(userRef, {
        next: (snapshot) => {
          const users = [];
          snapshot.docs.forEach((doc) => {
            users.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setUsers(users);
        },
      });
      return () => userSnapShot();
    };

    fetchUser();
  }, []);

  const signOut = async() => {
    try{
      await FIREBASE_AUTH.signOut()
        .then(()=>{
          router.push('/sign-in')
        })
    } catch(error){
      Alert(error)
    }
  }

  return (
    <SafeAreaView
      className="bg-[#070A0F] h-full"
      style={{ fontFamily: "KumbhSans" }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="m-3">
        <Text className="text-white text-center text-2xl my-3">Your Profile</Text>
          <View className="w-full px-3 flex-row items-center" style={styles.header}>
            <TabBarIcon name="person-circle" className="text-6xl text-white"/>
            
            <Text className="mt-2">
              {users.map((userman, index) => {
                if (userman.email === userEmail) {
                  return (
                    <View key={index}>
                      <Text className={
                Platform.OS === "ios"
                  ? "text-white text-xl ml-3"
                  : "text-white text-lg ml-3"
              }>
                      {userman.username}
                    </Text>
                    <Text className={
                Platform.OS === "ios"
                  ? "text-gray-400 text-sm ml-3"
                  : "text-gray-400 ml-3"
              }>
                      {userman.email}
                    </Text>
                    </View>
                    
                  );
                }
              })}
            </Text>
            <TouchableOpacity onPress={signOut} className="absolute right-4">
              <TabBarIcon name="exit" className="text-white text-xl" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
