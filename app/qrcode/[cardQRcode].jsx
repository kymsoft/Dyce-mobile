import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useLocalSearchParams } from "expo-router";
import { Button, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import QRCode from 'react-native-qrcode-svg';
import ViewShot from "react-native-view-shot"

import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from "react";
import { FIREBASE_AUTH, FIRESTORE_DB } from "@/FirebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
const CardQRcode = () => {
  const { cardQRcode } = useLocalSearchParams();
  const [cardDetails, setCardDetails] = useState([]);
  const [qrValue, setQrValue] = useState('');
  const [cards, setCards] = useState([]);
  const user = FIREBASE_AUTH.currentUser.uid;
  const viewShotRef = useRef(null)
  useEffect(() => {
    const fetchCardDetails = async () => {
      
      if (user) {
        const cardDoc = collection(FIRESTORE_DB, 'cards');
        const cardSnapShot = onSnapshot(cardDoc, {
          next: (snapshot) => {
            const cards = [];
            snapshot.docs.forEach((doc) => {
              cards.push({
                id: doc.id,
                ...doc.data()
              })
            })
            setCardDetails(cards)

          }
        })
        return () => cardSnapShot()
      }
    };
    
    fetchCardDetails();
  }, [])

  const activateQRcode =() =>{
    
    for(let i = 0; i<cardDetails.length; i++){
      
      if(cardQRcode== cardDetails[i].id){
        setQrValue(JSON.stringify(cardDetails[i].token))
      }
    }
  
  }
  
  


  return (
    
        <SafeAreaView className="bg-[#070A0F] h-full px-3 mt-3">
       <LinearGradient
        colors={['#960024', '#30000C']}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="w-full justify-center align-center shadow-lg rounded-xl h-52 flex-row"

      >
      <View className="w-full">
      {
          cardDetails.map((cardie, index)=>{
            if(cardie.id == cardQRcode) {
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
            <Text className="text-white absolute right-6 mt-36">{cardie.cardInfo}</Text>
      </TouchableOpacity>
              )
            }
          })
        }
      
      </View>
      <TouchableOpacity className="p-3 bg-[#000000] rounded-lg absolute right-3 mt-40" onPress={activateQRcode}>
        <Text className="text-white">Get QR code</Text>
      </TouchableOpacity>
        
    </LinearGradient>
    {
        qrValue && (
          
          <View className="bg-white justify-center items-center mt-7">
            <ViewShot
              ref={viewShotRef}
              options={{format: 'png', quality: 1.0}}
            >
            <QRCode
              value={qrValue} 
              size={300} 
              color="black"
              backgroundColor="white"
              />
            </ViewShot>
            
          </View>
        )
      }
    </SafeAreaView>
    
  );
};
export default CardQRcode;
