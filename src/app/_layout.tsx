import { Slot } from "expo-router";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen"
import { useEffect, useCallback } from "react";

import {
  useFonts,
  Raleway_400Regular,
  Raleway_700Bold,
  Raleway_900Black,
} from "@expo-google-fonts/raleway";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Raleway_700Bold,
    Raleway_900Black,
  });

// Função para ocultar o splash screen após carregar as fontes
// basicamente esse bloco serve somente para carregar o conteúdo da aplicação somente depois que as fontes forem carregadas
// para não quebrar nada do estilo da aplicação
  const onFontsLoaded = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    onFontsLoaded();
  }, [onFontsLoaded]);

  return (
    <>
      <GestureHandlerRootView>
        <StatusBar barStyle="light-content"/>
        {fontsLoaded && <Slot />}
      </GestureHandlerRootView>
    </>
  );
}
