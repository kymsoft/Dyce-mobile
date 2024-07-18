import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { images } from "../../constants";
import { SearchField } from "@/components/SearchField";
import CustomTransaction from "@/components/CustomTransaction";

const Receipt = () => {
  const [search, setSearch] = useState({
    input: "",
  });

  const [transactionExist, setTransactionExist] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const transactions = [
    { id: "1", amount: "$20", date: "2024-07-01", name: "Jidechi Ventures" },
    { id: "2", amount: "$50", date: "2024-07-02", name: "Ojo Ventures" },
    { id: "3", amount: "$30", date: "2024-07-03", name: "Lyonnet Ventures" },
    { id: "4", amount: "$40", date: "2024-07-04", name: "Loki Ventures" },
    { id: "5", amount: "$100", date: "2024-07-05", name: "Kilo Ventures" },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <SafeAreaView
      className="bg-[#070A0F] h-full"
      style={{ fontFamily: "KumbhSans" }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View className="fixed">
            <View className="w-full px-3 flex-row" style={styles.header}>
              <Image
                source={images.logoBlank}
                className="w-[50px] h-[50px] rounded-full mr-2 mt-4"
                resizeMode="contain"
              />
              <Text className="text-white text-lg mt-8 text-center">
                Transaction History
              </Text>
              <TouchableOpacity className=" absolute right-6 mt-7">
                <TabBarIcon
                  name="trash"
                  className="w-[25px] h-[25px] text-white"
                />
              </TouchableOpacity>
            </View>
            <View className="mt-3 mx-3">
              <SearchField
                title="Search"
                placeholder="Search Transaction Here..."
                value={search}
                handleChangeText={(e) => setSearch({ input: e })}
                otherStyles="mt-7"
              />
            </View>
          </View>

          {transactionExist ? (
            <View className="mt-7">
              <Text className="text-[#858585] mx-4">
              {currentDate.toDateString()}
              </Text>
              {transactions.map((item, index) => {
                return (
                  <View key={index}>
                    <CustomTransaction
                      date={item.date}
                      amount={item.amount}
                      name={item.name}
                      index={index}
                    />
                  </View>
                );
              })}
            </View>
          ) : (
            <View className="justify-center items-center px-4 min-h-[65vh] ">
              <Text className="text-gray-300">No transactions yet</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Receipt;

const styles = StyleSheet.create({});
