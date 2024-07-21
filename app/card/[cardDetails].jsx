import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { router, useLocalSearchParams } from "expo-router";
import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
// import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';
import { FIREBASE_AUTH, FIRESTORE_DB } from "@/FirebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import * as LocalAuthentication from "expo-local-authentication";
import { BackButton } from "@/components/BackButton";
// NfcManager.start();

const CardDetails = () => {
  const [cards, setCards] = useState([]);
  const { cardDetails } = useLocalSearchParams();
  const [cardData, setCardData] = useState([]);
  const [nfcEnabled, setNfcEnabled] = useState(false);
  const user = FIREBASE_AUTH.currentUser?.uid;

  useEffect(() => {
    const fetchCards = async () => {
      const result = await LocalAuthentication.authenticateAsync();

      if (result.success) {
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
            setCards(cards);
          },
        });
        return () => cardSnapShot();
      } else {
        router.back();
      }
    };

    fetchCards();
  }, []);

  // useEffect(() => {
  //   const checkNfcStatus = async () => {
  //     const isEnabled = await NFC.isAvailableAsync();
  //     setNfcEnabled(isEnabled);
  //   };

  //   checkNfcStatus();
  // }, []);

  // const writeNfcTag = async (data) => {
  //   try {
  //     await NfcManager.requestTechnology(NfcTech.Ndef);
  //     const bytes = Ndef.encodeMessage([Ndef.textRecord(JSON.stringify(data))]);
  //     await NfcManager.writeNdefMessage(bytes);
  //     console.log('Tag written successfully');
  //   } catch (ex) {
  //     console.warn(ex);
  //   } finally {
  //     NfcManager.cancelTechnologyRequest();
  //   }
  // };

  // const startWriting = async () => {

  //   if (user) {
  //     const cardDoc = collection(FIRESTORE_DB, 'cards');
  //     const cardSnapShot = onSnapshot(cardDoc, {
  //       next: (snapshot) => {
  //         const cards = [];
  //         snapshot.docs.forEach((doc) => {
  //           cards.push({
  //             id: doc.id,
  //             ...doc.data()
  //           })
  //         })
  //         if(cardDetails == cards.id){
  //           setCardData(cards)
  //           writeNfcTag(cards)
  //             .then(()=>{
  //               console.log("Writing successful")
  //             })
  //             .catch((error)=>{
  //               console.log("Error", error)
  //             })
  //         }

  //       }
  //     })
  //     return () => cardSnapShot()
  //   }
  // };

  return (
    <SafeAreaView className="bg-[#070A0F] h-full px-3 mt-3">
      
      <LinearGradient
        colors={["#3E006E", "#180030"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="w-full justify-center align-center shadow-lg rounded-xl h-52 flex-row border-solid border border-violet-400"
        style={styles.cardBody}
      >
        {cards.map((cardie, index) => {
          if (cardie.id == cardDetails) {
            return (
              <TouchableOpacity
                onPress={() => {}}
                className="w-full"
                key={index}
              >
                <ImageBackground
                  source={images.mount}
                  resizeMode="fill"
                  className="w-full h-full"
                >
                  {cardie.type === "visa" ? (
                    <Image
                      source={images.visa}
                      className="w-[60px] h-[60px] mx-2"
                      resizeMode="contain"
                    />
                  ) : cardie.type === "mastercard" ? (
                    <Image
                      source={images.mastercard}
                      className="w-[75px] h-[75px] mx-2"
                      resizeMode="contain"
                    />
                  ) : (
                    <Image
                      source={images.verve}
                      className="w-[75px] h-[75px] mx-2"
                      resizeMode="contain"
                    />
                  )}
                  <Text className="text-white absolute right-6 mt-44" style={styles.font}>
                    {cardie.cardInfo}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            );
          }
        })}
      </LinearGradient>
      <View className="mt-5">
        <Text className="text-[#6D6D6D] text-center" style={styles.font}>
          Tap your card to activate your NFC
        </Text>
      </View>
      <View className="my-3">
        <BackButton />
      </View>
    </SafeAreaView>
  );
};
export default CardDetails;

const styles = StyleSheet.create({
  font: {
    fontFamily: "Nunito",
  },
});
