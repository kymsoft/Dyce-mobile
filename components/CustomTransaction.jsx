import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native'
import { TabBarIcon } from './navigation/TabBarIcon';
import { router } from 'expo-router';

const CustomTransaction = ({date, amount, name, index}) =>{
    return(
        
        <View className="flex-row mt-1 mb-3 ml-3 mr-3">
            <TouchableOpacity
              onPress={() => {
                router.push(`/transaction/${index}`);
              }}
              className="flex-row w-full"
            >
            <View className=" p-2">
                <TabBarIcon name='swap-horizontal' className="text-white "/>
            </View>
            <View className="block ml-2">
            <Text className={Platform.OS === 'ios' ? "text-white text-lg my-1" : "text-white text-md my-1"} style={styles.font}>{name}</Text>
            <Text className="text-[#6D6D6D] text-[10px]" style={styles.font}>{date}</Text>
            </View>
            <View className="absolute right-2 my-2">
                <Text className="text-white text-lg" style={styles.font}>{amount}</Text>
            </View>
            </TouchableOpacity>
            
        </View>
    )
}

export default CustomTransaction;

const styles = StyleSheet.create({
    font: {
      fontFamily: "Nunito",
    },
  });