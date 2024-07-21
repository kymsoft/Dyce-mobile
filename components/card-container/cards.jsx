import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomCard from "../CustomCard";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
} from "react-native-reanimated";
import { onSnapshot } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "@/FirebaseConfig";
import Transactions from "./transactions";

const Cards = ({ isOpen, setIsOpen, cardData, isModalOpen, setModalIsOpen }) => {
  const user = FIREBASE_AUTH.currentUser.uid;
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    setNewData([
      { key: "spacer-left" },
      ...cardData,
      { key: "spacer-right" },
    ]);
  }, [cardData]);



  const { width } = useWindowDimensions();
  const SIZE = width * 0.9;
  const SPACER = (width - SIZE) / 2;
  const x = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  return (
    <Animated.ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      bounces={true}
      scrollEventThrottle={16}
      snapToInterval={SIZE}
      decelerationRate="fast"
      onScroll={onScroll}
    >
      {newData.map((carddata, index) => {
        // const style = useAnimatedStyle(() => {
        //   const scale = interpolate(
        //     x.value,
        //     [(index - 2) * SIZE, (index - 1) * SIZE, index * SIZE],
        //     [0.8, 1, 0.8]
        //   );
        //   return {
        //     transform: [{ scale }],
        //   };
        // });
        if(!carddata.userid){
          return <View style={{width: SPACER}} key={index}/>
        }
        if (carddata.userid === user) {
          return (
            <View style={{ width: SIZE }} key={index}>
              <Animated.View className="px-1">
                <CustomCard
                  cardInfo={carddata.cardInfo}
                  cardType={carddata.type}
                  index={carddata.id}
                  owner={carddata.owner}
                  code={carddata.code}
                  token={carddata.token}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  key={carddata.id}
                  isModalOpen={isModalOpen}
                  setModalIsOpen={setModalIsOpen}
                />
              </Animated.View>
            </View>
          );
        } 
      })}
    </Animated.ScrollView>
  );
};

export default Cards;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#960024",
  },
});
