import { Tabs } from 'expo-router';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { BottomSheetModalProvider} from "@gorhom/bottom-sheet"
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { Platform } from 'react-native';

const TabsLayout = () => {
  

  return (
    <>
    <GestureHandlerRootView>
    <BottomSheetModalProvider>
      <Tabs 
        screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#f5f5f5',
            tabBarInactiveTintColor: '#CDCDE0',
            tabBarStyle: {
                backgroundColor: '#161622',
                borderTopWidth: 1,
                borderTopColor: '#232533',
                height: Platform.OS === 'ios' ? 84 : 54
            } 
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} className={Platform.OS === 'android' && "text-[20px]"}/>
              ),
          }}
        />
        <Tabs.Screen
          name="receipt"
          options={{
            title: "Receipt",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? 'receipt' : 'receipt-outline'} color={color} className={Platform.OS === 'android' && "text-[20px]"}/>
              ),
          }}
        />
        <Tabs.Screen
          name="terminal"
          options={{
            title: "Terminal",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? 'sync' : 'sync-outline'} color={color} className={Platform.OS === 'android' && "text-[20px]"}/>
              ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? 'person-circle' : 'person-circle-outline'} color={color} className={Platform.OS === 'android' && "text-[20px]"}/>
              ),
          }}
        />
      </Tabs>
      </BottomSheetModalProvider>
      </GestureHandlerRootView>
      
    </>
  );
}

export default TabsLayout