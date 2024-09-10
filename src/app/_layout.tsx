import { Slot } from "expo-router";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen"
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Raleway: require("../../assets/fonts/Raleway-Bold.ttf"),
  })

  if(!fontsLoaded){
    return null;
  }

  SplashScreen.hideAsync();
  return (
    <>
      <GestureHandlerRootView>
        <StatusBar barStyle="light-content"/>
        <Slot />
      </GestureHandlerRootView>
    </>
  );
}
