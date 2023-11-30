import { Provider } from "react-redux";
import { persistor, store } from "./Store";
import Routes from "./Routes";
import { PersistGate } from "redux-persist/integration/react";
import {
  useFonts,
  BeVietnamPro_100Thin,
  BeVietnamPro_100Thin_Italic,
  BeVietnamPro_200ExtraLight,
  BeVietnamPro_200ExtraLight_Italic,
  BeVietnamPro_300Light,
  BeVietnamPro_300Light_Italic,
  BeVietnamPro_400Regular,
  BeVietnamPro_400Regular_Italic,
  BeVietnamPro_500Medium,
  BeVietnamPro_500Medium_Italic,
  BeVietnamPro_600SemiBold,
  BeVietnamPro_600SemiBold_Italic,
  BeVietnamPro_700Bold,
  BeVietnamPro_700Bold_Italic,
  BeVietnamPro_800ExtraBold,
  BeVietnamPro_800ExtraBold_Italic,
  BeVietnamPro_900Black,
  BeVietnamPro_900Black_Italic,
} from '@expo-google-fonts/be-vietnam-pro'
import AppLoading from "expo-app-loading";
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react";

function App() {
  let [fontsLoaded] = useFonts({
    BeVietnamPro_100Thin,
    BeVietnamPro_100Thin_Italic,
    BeVietnamPro_200ExtraLight,
    BeVietnamPro_200ExtraLight_Italic,
    BeVietnamPro_300Light,
    BeVietnamPro_300Light_Italic,
    BeVietnamPro_400Regular,
    BeVietnamPro_400Regular_Italic,
    BeVietnamPro_500Medium,
    BeVietnamPro_500Medium_Italic,
    BeVietnamPro_600SemiBold,
    BeVietnamPro_600SemiBold_Italic,
    BeVietnamPro_700Bold,
    BeVietnamPro_700Bold_Italic,
    BeVietnamPro_800ExtraBold,
    BeVietnamPro_800ExtraBold_Italic,
    BeVietnamPro_900Black,
    BeVietnamPro_900Black_Italic,
  });
  useEffect(()=>{
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare()
  },[])
  if (!fontsLoaded) {
    return undefined
  }else{
    SplashScreen.hideAsync()
  }
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Routes />
      </PersistGate>
    </Provider>
  );
}

export default App;
