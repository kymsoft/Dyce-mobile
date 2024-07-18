import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal as RNModal,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { CustomButton } from "@/components/CustomButton";
import { router } from "expo-router";
import Scanner from "@/components/Scanner";
import {
  BottomSheetModal,
} from "@gorhom/bottom-sheet";


const Terminal = () => {
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scannerIsOpen, setScannerIsOpen]= useState(false)
  const submit = () => {
    setIsOpen(true);
  };


  const bottomSheetModalRef = useRef(null);

  function handlePresentModal() {
    bottomSheetModalRef.current?.present();
    setScannerIsOpen((prevState) => !prevState);
    setIsOpen(false)
  }
  return (
    <>
      <SafeAreaView
        className="bg-[#070A0F] h-full"
        style={{ fontFamily: "KumbhSans" }}
      >
        <ScrollView>
          <View className="w-full justify-center min-h-[85vh] px-4 my-6">
            <Text className="text-white text-center text-lg">
              Enter Amount:{" "}
            </Text>
            <View
              className="border-2 border-black-200 w-full h-20 px-4 bg-black-100
         rounded-2xl focus:border-[#3E006E] items-center flex-row my-2"
            >
              <Text className="text-white text-base mx-3 text-lg">NGN</Text>
              <TextInput
                className="text-center flex-1 text-white text-base text-2xl"
                keyboardType="numeric"
                value={amount}
                onChangeText={(text) => {
                  setAmount(text);
                }}
                placeholder="Amount here"
              />
            </View>
            <CustomButton
              title="Receive"
              handlePress={submit}
              containerStyles="mt-5"
              isLoading={isSubmitting}
            />
            
          </View>
        </ScrollView>
      </SafeAreaView>
      <RNModal
        visible={isOpen}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
        <KeyboardAvoidingView className="items-center justify-center flex-1 px-3 px-3 bg-zinc-800/40">
          <View className="min-h-auto w-80 rounded-3xl bg-[#000000] p-5">
            <TouchableOpacity onPress={() => setIsOpen(false)}>
              <TabBarIcon
                name="close-circle"
                className="text-gray-100 absolute right-2"
              />
            </TouchableOpacity>
            <View className="justify-center items-center px-4 h-60 ">
              <Text className="text-white text-center text-3xl text-bold">
                N {amount}
              </Text>
              <TouchableOpacity onPress={handlePresentModal} className="mt-10 border-gray-100 mb-5">
                <TabBarIcon name="qr-code-outline" className="text-white text-4xl" />
              </TouchableOpacity>
              <Text className="text-[#6D6D6D]">Click to scan QRcode</Text>
            </View>
          </View>
        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
        
      </RNModal>
      {/* <RNModal
        visible={scannerIsOpen}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setScannerIsOpen(false)}
      >
        <View className=" rounded-3xl bg-[#000000] p-5 items-center justify-center px-3 px-3 bg-[#000000]">
        <TouchableOpacity onPress={() => setIsOpen(false)}>
              <TabBarIcon
                name="close-circle"
                className="text-gray-100 absolute right-2"
              />
            </TouchableOpacity>
            <Scanner />
        </View>

      </RNModal> */}
      <Scanner setScannerIsOpen={setScannerIsOpen} handlePresentModal={handlePresentModal} bottomSheetModalRef={bottomSheetModalRef}/>
    
          
        
      
      
    </>
  );
};

export default Terminal;

const styles = StyleSheet.create({});
