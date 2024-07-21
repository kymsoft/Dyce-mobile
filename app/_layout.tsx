import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { onAuthStateChanged, User } from "firebase/auth";
import { FIREBASE_AUTH } from "@/FirebaseConfig";


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Nunito: require("../assets/fonts/Nunito.ttf"),
  });
  // const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // useEffect(() => {
  //   onAuthStateChanged(FIREBASE_AUTH, (user) => {
  //     console.log(user);
  //     setUser(user);

  //   });
  // }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }}/>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="card/[cardDetails]"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="card/cardForm" options={{ headerShown: false }} />
          <Stack.Screen
            name="qrcode/[cardQRcode]"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="transaction/[transactionDetails]"
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen name="/search/[query]" options={{ headerShown: false }} /> */}
          <Stack.Screen name="+not-found" />
        </Stack>
    </ThemeProvider>
  );
}
