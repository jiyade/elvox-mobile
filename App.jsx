import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import * as Font from "expo-font"
import * as SplashScreen from "expo-splash-screen"
import { useCallback, useEffect } from "react"
import { View } from "react-native"
import "./global.css"
import Toaster from "./src/components/Toaster"
import Dashboard from "./src/screens/Dashboard"
import Login from "./src/screens/Login"
import Signup from "./src/screens/Signup"
import { useAuthStore } from "./src/stores"

const Stack = createNativeStackNavigator()

const AuthStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
            name='Login'
            component={Login}
        />
        <Stack.Screen
            name='Signup'
            component={Signup}
        />
    </Stack.Navigator>
)

const ProtectedStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name='Dashboard'
            component={Dashboard}
        />
    </Stack.Navigator>
)

export default function App() {
    const { isAuthenticated, fetchMe } = useAuthStore()

    const [fontsLoaded] = Font.useFonts({
        Inter: require("./assets/fonts/Inter-Variable.ttf"),
        Sansation: require("./assets/fonts/Sansation-Regular.ttf")
    })

    useEffect(() => {
        SplashScreen.preventAutoHideAsync().catch(() => {})
        fetchMe()
    }, [fetchMe])

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) await SplashScreen.hideAsync()
    }, [fontsLoaded])

    if (!fontsLoaded) return null

    return (
        <>
            <View
                className='flex-1 font-inter'
                onLayout={onLayoutRootView}
            >
                <NavigationContainer>
                    {isAuthenticated ? <ProtectedStack /> : <AuthStack />}
                </NavigationContainer>
            </View>
            <Toaster />
        </>
    )
}
