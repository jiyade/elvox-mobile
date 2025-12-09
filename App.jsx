import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import * as Font from "expo-font"
import * as SplashScreen from "expo-splash-screen"
import { useCallback, useEffect } from "react"
import { View } from "react-native"
import "./global.css"
import DashboardScreen from "./src/screens/DashboardScreen"
import LoginScreen from "./src/screens/LoginScreen"

const Stack = createNativeStackNavigator()

export default function App() {
    const [fontsLoaded] = Font.useFonts({
        Inter: require("./assets/fonts/Inter-Variable.ttf"),
        Sansation: require("./assets/fonts/Sansation-Regular.ttf")
    })

    useEffect(() => {
        SplashScreen.preventAutoHideAsync().catch(() => {})
    }, [])

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) await SplashScreen.hideAsync()
    }, [fontsLoaded])

    if (!fontsLoaded) return null

    return (
        <View
            className='flex-1 font-inter'
            onLayout={onLayoutRootView}
        >
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen
                        name='Login'
                        component={LoginScreen}
                    />
                    <Stack.Screen
                        name='Dashboard'
                        component={DashboardScreen}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    )
}
