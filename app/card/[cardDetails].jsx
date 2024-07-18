import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from "react";
// import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';
import { FIREBASE_AUTH, FIRESTORE_DB } from "@/FirebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

// NfcManager.start();

const CardDetails = () => {
  const [cards, setCards] = useState([]);
  const { cardDetails } = useLocalSearchParams();
  const [cardData, setCardData] = useState([])
  const [nfcEnabled, setNfcEnabled] = useState(false);
  const user = FIREBASE_AUTH.currentUser.uid;

  useEffect(() => {
    const fetchCards = async () => {
      
      if(user){
        const cardRef = collection(FIRESTORE_DB, 'cards');
        const cardSnapShot = onSnapshot(cardRef, {
          next: (snapshot) => {
            const cards = [];
            snapshot.docs.forEach((doc) => {
              cards.push({
                id: doc.id,
                ...doc.data()
              })

            })
            setCards(cards)

          }
        })
        return () => cardSnapShot()
      }
    };
    
    fetchCards();
  }, [])

 
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
        colors={['#960024', '#30000C']}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="w-full justify-center align-center shadow-lg rounded-xl h-52 flex-row"

      >
        {
          cards.map((cardie, index)=>{
            if(cardie.id == cardDetails ) {
              return(
                <TouchableOpacity onPress={() => {}} className="w-full" key={index}>
            {cardie.type ==='visa'?(
            <Image
            source={images.visa}
            className="w-[60px] h-[60px] mx-2"
            resizeMode="contain"
          />
          ) : (
            (
              cardie.type === 'mastercard' ? (
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
              )
            )
          )}
            <Text className="text-white absolute right-6 mt-40">{cardie.cardInfo}</Text>
      </TouchableOpacity>
              )
            }
          })
        }
      
      
        
    </LinearGradient>
    <View className="mt-5">
      <Text className="text-[#6D6D6D] text-center">Tap your card to activate your NFC</Text>
    </View>
    </SafeAreaView>
  );
};
export default CardDetails;
