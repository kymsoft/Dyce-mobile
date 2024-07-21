import {
  ActivityIndicator,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,  
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { Link} from "expo-router";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { collection, onSnapshot } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "@/FirebaseConfig";
import Cards from "@/components/card-container/cards";
import Transactions from "@/components/card-container/transactions";


const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [cardExist, setCardExist] = useState(false);
  const [users, setUsers] = useState([]);
  const user = FIREBASE_AUTH.currentUser?.uid;
  const userEmail = FIREBASE_AUTH.currentUser?.email;
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchCards = async () => {
      setIsLoading(true)
      const cardRef = collection(FIRESTORE_DB, "cards");
      const cardSnapShot = onSnapshot(cardRef, {
        next: (snapshot) => {
          const cards = [];
          snapshot.docs.forEach((doc) => {
            cards.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          for (let i = 0; i < cards.length; i++) {
            if (cards[i].userid == user) {
              setCardExist(true);
            }
          }
          setCards(cards);
        },
      });
      return () => cardSnapShot();
    };
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

    fetchCards();
    fetchUser();
    setIsLoading(false);
  }, []);
  

  return (
    <SafeAreaView className="bg-[#070A0F] h-full" style={styles.header}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View className="w-full px-3 flex-row" style={styles.header}>
            <Image
              source={images.logoBlank}
              className="w-[50px] h-[50px] rounded-full mr-2 mt-4"
              resizeMode="contain"
            />
            <Text
              className={
                Platform.OS === "ios"
                  ? "text-white text-lg mt-8 text-bold"
                  : "text-white text-md mt-8"
              }
              style={styles.font}
            >
              What's good{" "}
              {users.map((userman, index) => {
                if (userman.email === userEmail) {
                  return (
                    <Text key={index} className="text-[#9E00FF]">
                      {userman.username} 
                    </Text>
                  );
                }
              })}
            </Text>
            <Link href="/terminal" className=" absolute right-6 mt-8">
              <TabBarIcon
                name="qr-code"
                className={
                  Platform.OS === "ios"
                    ? "w-[25px] h-[25px] text-white"
                    : "text-sm text-white"
                }
              />
            </Link>
          </View>
          <View className="w-full px-3 m-4 flex-row" style={styles.header}>
            <Text
              className={
                Platform.OS === "ios"
                  ? "text-white text-xl"
                  : "text-white text-lg"
              }
              style={styles.font}
            >
              Your Cards
            </Text>
            <View className=" absolute right-8 border-2 border-black-200 h-8 px-4 bg-black-100 rounded-xl items-center flex-row">
              <Link
                href="/card/cardForm"
                className={
                  Platform.OS === "ios"
                    ? "flex-1 text-white text-base text-[12px]"
                    : "flex-1 text-white text-base text-[12px]"
                }
                style={styles.font}
              >
                New Card
              </Link>
            </View>
          </View>
          {
            isLoading ? (
              <ActivityIndicator size="large" color="#FFF" className="justify-center items-center min-h-[600px]" />
            ) : (
              (cardExist ? (
                <View>
                  <Cards isOpen={isOpen} setIsOpen={setIsOpen} cardData={cards} isModalOpen={isModalOpen} setModalIsOpen={setModalIsOpen} />
                  <Transactions />
                </View>
              ) : (
                <View className="justify-center items-center px-4 min-h-[60vh]">
                  <Image 
                  source={images.cards} 
                  className="h-[300px] w-[300px]"
                  />
                  <Text className="text-gray-300 text-center" style={styles.header}>
                    No Cards Yet{"\n"}
                    Get Started With Tenet
                  </Text>
                </View>
              ))
            )
          }
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  font: {
    fontFamily: "Nunito",
  },
});
