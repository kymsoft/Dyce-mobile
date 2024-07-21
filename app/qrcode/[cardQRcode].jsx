import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { router, useLocalSearchParams } from "expo-router";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import { FIREBASE_AUTH, FIRESTORE_DB } from "@/FirebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { BackButton } from "@/components/BackButton";
import generateRandomAlphanumeric from "@/lib/utils";
import * as LocalAuthentication from 'expo-local-authentication'

const CardQRcode = () => {
  const { cardQRcode } = useLocalSearchParams();
  const [cardDetails, setCardDetails] = useState([]);
  const [qrValue, setQrValue] = useState("");
  const viewShotRef = useRef(null);
  useEffect(() => {
    const fetchCardDetails = async () => {
      const result = await LocalAuthentication.authenticateAsync();
      if(result.success){
        const cardDoc = collection(FIRESTORE_DB, "cards");
        const cardSnapShot = onSnapshot(cardDoc, {
          next: (snapshot) => {
            const cards = [];
            snapshot.docs.forEach((doc) => {
              cards.push({
                id: doc.id,
                ...doc.data(),
              });
            });
            setCardDetails(cards);
            for (let i = 0; i < cards.length; i++) {
              if (cardQRcode == cards[i].id) {
                setQrValue(JSON.stringify(cards[i].token));
              }
            }
          },
        });
        return () => cardSnapShot();
      } else{
        router.back()
      }
        

    };

    fetchCardDetails();
  }, []);

  const generateDefaultCardCode= () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const getCode = () => {
    const randomCode = generateDefaultCardCode();

  };

  return (
    <SafeAreaView className="bg-[#070A0F] h-full px-3 mt-5">
      <BackButton />
      <LinearGradient
        colors={["#3E006E", "#180030"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="w-full shadow-lg rounded-xl h-[80%] my-7"
      >
        <View className="bg-white justify-center items-center mt-10 mx-10">
          {qrValue && (
            <ViewShot
              ref={viewShotRef}
              options={{ format: "png", quality: 1.0 }}
            >
              <QRCode
                value={qrValue}
                size={300}
                color="black"
                backgroundColor="white"
              />
            </ViewShot>
          )}
        </View>

        <View className="w-full mt-2">
          {cardDetails.map((cardie, index) => {
            if (cardie.id == cardQRcode) {
              return (
                <View className="w-full" key={index}>
                  {cardie.type === "visa" ? (
                    <Image
                      source={images.visa}
                      className="w-[60px] h-[60px] ml-7"
                      resizeMode="contain"
                    />
                  ) : cardie.type === "mastercard" ? (
                    <Image
                      source={images.mastercard}
                      className="w-[75px] h-[75px] ml-7"
                      resizeMode="contain"
                    />
                  ) : (
                    <Image
                      source={images.verve}
                      className="w-[75px] h-[75px] ml-7"
                      resizeMode="contain"
                    />
                  )}
                  <Text className="text-white absolute right-6 mt-32" style={styles.font}>
                    {cardie.cardInfo}
                  </Text>
                </View>
              );
            }
            return(
              <TouchableOpacity
            className="p-3 bg-[#000000] rounded-lg absolute right-3 mt-40"
            onPress={getCode} key={index}
          >
            <Text className="text-white" style={styles.font}>Get one-time code</Text>
          </TouchableOpacity>
            )
            
          })}
          
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};
export default CardQRcode;

const styles = StyleSheet.create({
  font: {
    fontFamily: "Nunito",
  },
});
