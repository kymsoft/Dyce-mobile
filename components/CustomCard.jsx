import { Image, StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback, Alert } from "react-native";
import React, { useRef, useState } from "react";
import { images } from "@/constants";
import { Link, router } from "expo-router";
import { TabBarIcon } from "./navigation/TabBarIcon";
import { LinearGradient } from "expo-linear-gradient";
import {
  BottomSheetModal,
} from "@gorhom/bottom-sheet";


const CustomBackdrop = ({ dismissModal }) => (
  <TouchableWithoutFeedback onPress={dismissModal}>
    <View style={styles.backdrop} />
  </TouchableWithoutFeedback>
);


const CustomCard = ({ cardInfo, cardType, index, isOpen, setIsOpen, code, owner, token }) => {
  const bottomSheetModalRef = useRef(null);

  const snapPoints = ["30%"];

  function handlePresentModal() {
    bottomSheetModalRef.current?.present();
    setIsOpen((prevState) => !prevState);
  }
  const handleClosePress = () => {
    try {
      bottomSheetModalRef.current.close()
    } catch (error) {
      Alert(error)
    }
    
  }
  
  return (
    <View className="">
      <View>
        <LinearGradient
          colors={["#960024", "#30000C"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="w-full justify-center align-center shadow-lg rounded-xl h-52 flex-row"
        >
          <TouchableOpacity
            onPress={() => {
              router.push(`/card/${index}`);
            }}
            className="w-full"
          >
            <TouchableOpacity
              className="absolute right-4 mt-4"
              onPress={()=>handlePresentModal()}
            >
              <TabBarIcon name="ellipsis-vertical" className="text-white" />
            </TouchableOpacity>

            {cardType ==='visa'?(
            <Image
            source={images.visa}
            className="w-[60px] h-[60px] mx-2"
            resizeMode="contain"
          />
          ) : (
            (
              cardType === 'mastercard' ? (
                <Image
            source={images.mastercard}
            className="w-[75px] h-[75px]"
            resizeMode="contain"
          />
              ) : (
                <Image
            source={images.verve}
            className="w-[75px] h-[75px]"
            resizeMode="contain"
          />
              )
            )
          )}
          <Text className="text-white absolute right-6 mt-40">{cardInfo}</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{
          borderRadius: 50,
          backgroundColor: "#000000",
          borderTopColor: "#232533",
          borderTopWidth: 1,
          shadowColor: "#232533",

        }}
        onDismiss={()=>setIsOpen(false)}
        backdropComponent={() => (
          <View style={styles.backdrop}>
            <CustomBackdrop dismissModal={handleClosePress} />
          </View>
        )}
        handleIndicatorStyle={styles.handleIndicator}
      >
        <View className="flex-1 px-4">
          <TouchableOpacity onPress={handleClosePress}>
            <TabBarIcon name="close-circle" className="text-gray-100 absolute right-3"  />
          </TouchableOpacity>
          <View className="  mt-6 mx-2 rounded-lg p-4">
          <Link href={`/qrcode/${index}`} className=" w-full mb-7">
            <Image
              source={images.qrcode}
              className="w-[15px] h-[15px] mr-2"
            />
            
            <Text className="text-white text-lg">Get Codes</Text>
            </Link>
            <Link href={`/qrcode/${index}`} className=" w-full mb-7">
            <TabBarIcon 
              name="lock-closed"
              className="text-white text-[15px]"
            />
            
            <Text className="text-white text-lg ml-2">Set Card PIN</Text>
            </Link>
            <Link href={`/qrcode/${index}`} className=" w-full mb-7">
            <TabBarIcon 
              name="warning"
              className="text-white mr-2 text-[15px]"
            />
            
            <Text className="text-white text-lg">Remove Card</Text>
            </Link>
          </View>
            
        </View>
      </BottomSheetModal>
    </View>
  );
};

export default CustomCard;

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  handleIndicator: {
    backgroundColor: '#ffffff', // Change this to the desired color
    width: 40,
    height: 6,
    borderRadius: 3,
  },
});
