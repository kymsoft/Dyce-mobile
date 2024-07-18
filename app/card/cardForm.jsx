import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Link, router, useLocalSearchParams } from "expo-router";
import {
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import { FormField } from "@/components/FormField";
import { useEffect, useState } from "react";
import { CustomButton } from "@/components/CustomButton";
import { BackButton } from "@/components/BackButton";
import * as Crypto from 'expo-crypto';
import { FIREBASE_AUTH, FIRESTORE_DB } from "@/FirebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import {generateRandomAlphanumeric} from '../../lib/utils'

const CardForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardType, setCardType] = useState('');
  const [cardHolder, setCardHolder] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatCardNumber = (number) => {
    return number.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  const detectCardType = (number) => {
    const cleaned = number.replace(/\s+/g, '');
    if (/^4/.test(cleaned)) {
      setCardType('visa');
    } else if (/^5[1-5]/.test(cleaned) || /^(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)/.test(cleaned)) {
      setCardType('mastercard');
    } else if (/^5060[0-9]{2}|^6500[0-2][0-9]{2}/.test(cleaned)) {
      setCardType('verve');
    } else {
      setCardType('');
    }
  };

  const generateDefaultCardCode= () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
    const last4 = cardNumber.slice(-4);
    const savedCardNumber = `**** ${last4}`
    const defaultCardCode = generateDefaultCardCode();
    // const currentDate = new Date();
  
    // const year = currentDate.getFullYear();
    // const month = currentDate.getMonth() + 1; // Months are zero-indexed
    // const day = currentDate.getDate();
    
    // // Combine into a formatted date string
    // const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  
    const dateOfCreation = new Date;
    const user = FIREBASE_AUTH.currentUser.uid;

  const submit = async () => {
    const cardDetails = `${cardNumber}, ${expiryDate}, ${cvc}, ${cardType}`;
    const cardToken = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256, String(cardDetails)
    );
    
    const doc =await addDoc(collection(FIRESTORE_DB, 'cards'), {userid: user, token: cardToken, cardInfo: savedCardNumber, owner: cardHolder, type: cardType, code: defaultCardCode, createdAt: dateOfCreation})
      .then(() => {
        console.log("Card Added")
        Alert("Card Added")
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
        <View className="w-full justify-center px-4 my-6">
          <BackButton />

          <Text className="text-xl text-white text-semibold mt-10 text-center">
            Add Your Payment Method
          </Text>

          <FormField
            title="CardHolder"
            value={cardHolder}
            handleChangeText={(text) => setCardHolder(text)}
            otherStyles="my-7"
          />

          
         <View 
        className="border-2 border-black-200 w-full h-12 px-4 bg-black-100
         rounded-2xl focus:border-[#3E006E] items-center flex-row my-2"
      >
        <Text className="text-white text-base flex-1">Card Number</Text>
          <TextInput
            className="flex-1 text-white text-base"
            value={cardNumber}
            placeholder="1234 5678 8765 4321"
            placeholderTextColor="#7b7b8b"
            onChangeText={(text) => {
              const formattedText = formatCardNumber(text);
              setCardNumber(formattedText);
              detectCardType(formattedText);
            }}
            keyboardType="numeric"
            maxLength={19}
          />
          {cardType ==='visa'?(
            <Image
            source={images.visa}
            className="w-[25px] h-[25px]"
            resizeMode="contain"
          />
          ) : (
            (
              cardType === 'mastercard' ? (
                <Image
            source={images.mastercard}
            className="w-[25px] h-[25px]"
            resizeMode="contain"
          />
              ) : (
                <Image
            source={images.verve}
            className="w-[25px] h-[25px]"
            resizeMode="contain"
          />
              )
            )
          )}
      </View>
      <View 
        className="border-2 border-black-200 w-full h-12 px-4 bg-black-100
         rounded-2xl focus:border-[#3E006E] items-center flex-row my-2"
      >
        <Text className="text-white text-base flex-1">Expiry Date</Text>
      <TextInput
      className="flex-1 text-white text-base"
        keyboardType="numeric"
        value={expiryDate}
        onChangeText={(text)=>{
          if (text.length === 2 && !text.includes('/')) {
            text = text + '/';
          }
          setExpiryDate(text);
        }}
        maxLength={5} // MM/YY
        placeholder="MM/YY"
      />

      </View>
      <View 
        className="border-2 border-black-200 w-full h-12 px-4 bg-black-100
         rounded-2xl focus:border-[#3E006E] items-center flex-row my-2"
      >
        <Text className="text-white text-base flex-1">CVC</Text>
          <TextInput
            className="flex-1 text-white text-base"
            value={cvc}
            placeholder="***"
            placeholderTextColor="#7b7b8b"
            onChangeText={(text) => setCvc(text)}
            keyboardType="numeric"
            maxLength={3}
          />
      </View>
          
          
          {/* <RNDateTimePicker mode="date" /> */}

          {/* <CardField 
              postalCodeEnabled = {true}
              placeholders={{
                number: '1234 5678 8765 4321',
              }}
              onCardChange={cardDetails => {setCardDetails(cardDetails)}}
              cardStyle={styles.card}
              className="border-2 border-black-200 w-full h-12 px-4 bg-black-100 rounded-2xl focus:border-[#A8159A] items-center flex-row"
            /> */}

          <CustomButton
            title="Add Card"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default CardForm;

const styles = StyleSheet.create({
  card: {},
});
