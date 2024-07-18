import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import { FormField } from "@/components/FormField";
const TransactionDetails = () => {
    const { transactionDetails } = useLocalSearchParams();

  return (
    <SafeAreaView className="bg-[#070A0F] h-full">
       <ScrollView>
        <Text className="text-white">Transaction {transactionDetails}</Text>
       </ScrollView>
    </SafeAreaView>
  );
};
export default TransactionDetails;
