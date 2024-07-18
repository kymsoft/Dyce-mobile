import { FlatList, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import CustomTransaction from "../CustomTransaction";

const Transactions = () => {
  const [transactionExist, setTransactionExist] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const transactions= [
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

  const lastThreeTransactions = [...transactions].reverse().slice(0, 4);

  return (
    <View className="mx-6">
      <View className="flex-row mt-6 mb-2">
        <Text className={Platform.OS === 'ios' ? "text-white text-md" : "text-white text-sm"}>Recent Activity</Text>
        <Link
          href="/(tabs)/receipt"
          className={Platform.OS === 'ios' ? "text-sm text-[#9E00FF] absolute right-0" : "text-[12px] text-[#EC9CF9] absolute right-0"}
        >
          View All
        </Link>
      </View>
      
        <View className="min-h-auto w-full bg-[#191A22] rounded-xl pb-2">
          {transactionExist ? (
            <View>
              <Text className={Platform.OS === 'ios' ? "text-[#858585] m-3" : "text-[#858585] m-3 text-[10px]"}>
                {currentDate.toDateString()}
              </Text>
              {
                lastThreeTransactions.map((item, index) => {
                  return(
                    <View key={index}>
                      <CustomTransaction date={item.date} amount={item.amount} name={item.name} index={index}/>
                    </View>
                  )
                })
              }
            </View>
          ) : (
            <View className="justify-center items-center px-4 min-h-[40vh] ">
              <Text className={Platform.OS === 'ios' ? "text-gray-300" : "text-gray-300 text-sm"}>No transactions yet</Text>
            </View>
          )}
        </View>
      
    </View>
  );
};

export default Transactions;

const styles = StyleSheet.create({});
