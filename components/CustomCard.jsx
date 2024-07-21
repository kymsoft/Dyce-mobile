import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Alert,
  Modal as RNModal,
  Vibration,
  KeyboardAvoidingView,
  Button,
  ImageBackground,
} from "react-native";
import React, { useRef, useState } from "react";
import { images } from "@/constants";
import { Link, router } from "expo-router";
import { TabBarIcon } from "./navigation/TabBarIcon";
import { LinearGradient } from "expo-linear-gradient";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { deleteDoc, doc } from "firebase/firestore";
import { FIRESTORE_DB } from "@/FirebaseConfig";

const CustomBackdrop = ({ dismissModal }) => (
  <TouchableWithoutFeedback onPress={dismissModal}>
    <View style={styles.backdrop} />
  </TouchableWithoutFeedback>
);

const CustomCard = ({
  cardInfo,
  cardType,
  index,
  isOpen,
  setIsOpen,
  code,
  owner,
  token,
  isModalOpen,
  setModalIsOpen,
}) => {
  const bottomSheetModalRef = useRef(null);

  const snapPoints = ["30%"];

  function handlePresentModal() {
    bottomSheetModalRef.current?.present();
    setIsOpen((prevState) => !prevState);
  }
  const handleClosePress = () => {
    bottomSheetModalRef.current?.dismiss();
  };

  const deleteCard = async () => {
    const ref = doc(FIRESTORE_DB, `cards/${index}`);
    await deleteDoc(ref)
      .then(() => {
        Alert("Card Removed Successfully!");
      })
      .catch((error) => {
        Alert(error);
      })
      .finally(() => {
        setModalIsOpen(false);
        setIsOpen(false);
      });
  };
  return (
    <>
      <View className="">
        <View>
          <LinearGradient
            colors={["#3E006E", "#180030"]}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="w-full justify-center align-center shadow-lg rounded-xl h-56 flex-row border border-violet-400"
          >
            <TouchableOpacity
              onPress={() => {
                router.push(`/card/${index}`);
              }}
              className="w-full"
            >
              <ImageBackground
                source={images.mount}
                resizeMode="fill"
                className="w-full h-full"
              >
                <TouchableOpacity
                  className="absolute right-4 mt-4"
                  onPress={() => handlePresentModal()}
                >
                  <TabBarIcon name="ellipsis-vertical" className="text-white" />
                </TouchableOpacity>

                {cardType === "visa" ? (
                  <Image
                    source={images.visa}
                    className="w-[60px] h-[60px] mx-2"
                    resizeMode="contain"
                  />
                ) : cardType === "mastercard" ? (
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
                )}
                <Text
                  className="text-white absolute right-6 mt-44"
                  style={styles.font}
                >
                  {cardInfo}
                </Text>
              </ImageBackground>
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
          onDismiss={() => setIsOpen(false)}
          backdropComponent={() => (
            <View style={styles.backdrop}>
              <CustomBackdrop dismissModal={handleClosePress} />
            </View>
          )}
          handleIndicatorStyle={styles.handleIndicator}
        >
          <View className="flex-1 px-4">
            <TouchableOpacity
              onPress={() => {
                bottomSheetModalRef.current.close();
              }}
            >
              <TabBarIcon
                name="close-circle"
                className="text-gray-100 absolute right-3"
              />
            </TouchableOpacity>
            <View className="  mt-6 mx-2 rounded-lg p-4">
              <TouchableOpacity
                onPress={() => {
                  router.push(`/card/${index}`);
                }}
                className="flex-row w-full mb-7"
              >
                <TabBarIcon
                  name="qr-code"
                  className="text-white text-lg mr-1"
                />

                <Text className="text-white text-lg" style={styles.font}>
                  Get Codes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  router.push(`/card/${index}`);
                }}
                className="flex-row w-full mb-7"
              >
                <TabBarIcon
                  name="lock-closed"
                  className="text-white text-lg mr-1"
                />

                <Text className="text-white text-lg" style={styles.font}>
                  Edit Card Details
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Vibration.vibrate();
                  setModalIsOpen(true);
                }}
                className="flex-row w-full mb-7"
              >
                <TabBarIcon
                  name="warning"
                  className="text-white mr-1  text-lg"
                />

                <Text className="text-white text-lg" style={styles.font}>
                  Remove Card
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheetModal>
      </View>
      {isModalOpen && (
        <RNModal
          visible={isModalOpen}
          transparent
          animationType="fade"
          statusBarTranslucent
          onRequestClose={() => setModalIsOpen(false)}
        >
          <TouchableWithoutFeedback onPress={() => setModalIsOpen(false)}>
            <KeyboardAvoidingView className="items-center justify-center flex-1 px-3 bg-zinc-800/40 blur-2xl">
              <View className="mb-5"></View>
              <View className="min-h-auto w-80 rounded-3xl bg-[#000000] p-5">
                <Text
                  className="text-white text-center m-5 text-md"
                  style={styles.font}
                >
                  Are you sure you want to delete card?
                </Text>
                <View className="flex-row justify-between">
                  <View className="border-md border-[#6D6D6D] px-4 text-red">
                    <Button
                      title="Cancel"
                      onPress={() => setModalIsOpen(false)}
                      className=""
                      style={styles.font}
                    />
                  </View>
                  <View className="border-lg border-[#6D6D6D] px-4">
                    <Button
                      title="Accept"
                      onPress={() => {
                        deleteCard();
                      }}
                      className=""
                      style={styles.font}
                    />
                  </View>
                </View>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </RNModal>
      )}
    </>
  );
};

export default CustomCard;

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  handleIndicator: {
    backgroundColor: "#ffffff", // Change this to the desired color
    width: 40,
    height: 6,
    borderRadius: 3,
  },
  font: {
    fontFamily: "Nunito",
  },
});
