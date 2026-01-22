import {
    Text,
    StyleSheet,
    Pressable,
    useColorScheme,
    Image,
    BackHandler
} from "react-native"
import { useEffect, useRef, useState } from "react"
import { WebView } from "react-native-webview"
import NetInfo from "@react-native-community/netinfo"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { useFonts } from "expo-font"
import * as Notifications from "expo-notifications"
import * as SplashScreen from "expo-splash-screen"
import FullScreenLoader from "./src/components/FullScreenLoader"
import { getDeviceId } from "./src/utils/deviceId"
import { getExpoPushToken } from "./src/utils/pushToken"

const WEB_URL = "https://elvox-app.vercel.app"

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false
    })
})

SplashScreen.preventAutoHideAsync()

const App = () => {
    const webRef = useRef(null)
    const [online, setOnline] = useState(true)
    const [loading, setLoading] = useState(true)
    const [deviceId, setDeviceId] = useState(null)
    const [pushToken, setPushToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [canGoBack, setCanGoBack] = useState(false)

    const hasLoadedOnce = useRef(false)

    const scheme = useColorScheme()
    const isDark = scheme === "dark"

    const [fontsLoaded] = useFonts({
        Inter: require("./assets/fonts/Inter-Variable.ttf")
    })

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync()
        }
    }, [fontsLoaded])

    useEffect(() => {
        const unsub = NetInfo.addEventListener((state) => {
            setOnline(Boolean(state.isConnected && state.isInternetReachable))
        })
        return unsub
    }, [])

    // Get Device ID
    useEffect(() => {
        ;(async () => {
            const id = await getDeviceId()
            setDeviceId(id)
        })()
    }, [])

    // Get Push Token
    useEffect(() => {
        ;(async () => {
            const token = await getExpoPushToken()
            setPushToken(token)
        })()
    }, [])

    useEffect(() => {
        const sendDeviceInfoToBackend = async (deviceId, pushToken, userId) => {
            try {
                await fetch(
                    "https://elvox-server.onrender.com/notifications/devices/register",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            userId,
                            deviceId,
                            pushToken,
                            platform: "android"
                        })
                    }
                )
            } catch (error) {
                console.error("Error registering device:", error)
            }
        }

        if (deviceId && pushToken && userId) {
            sendDeviceInfoToBackend(deviceId, pushToken, userId)
        }
    }, [deviceId, pushToken, userId])

    // Handle messages from webview
    const handleWebViewMessage = (event) => {
        try {
            const message = JSON.parse(event.nativeEvent.data)

            switch (message.type) {
                case "USER_LOGGED_IN":
                    // WebView sends userId after successful login
                    setUserId(message.userId)
                    break

                case "USER_LOGGED_OUT":
                    // Clear userId on logout
                    setUserId(null)
                    break

                default:
                    console.log("Unknown message type:", message.type)
            }
        } catch (error) {
            console.error("Error parsing WebView message:", error)
        }
    }

    useEffect(() => {
        const backAction = () => {
            if (canGoBack && webRef.current) {
                webRef.current.goBack()
                return true
            }
            BackHandler.exitApp()
            return true
        }

        const sub = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        )

        return () => sub.remove()
    }, [canGoBack])

    const retry = () => {
        webRef.current?.reload()
    }

    if (!fontsLoaded) {
        return null
    }

    if (!online) {
        return (
            <SafeAreaView
                style={[
                    styles.offlineContainer,
                    {
                        backgroundColor: isDark ? "#000000" : "#f7f7f7"
                    }
                ]}
            >
                <Image
                    source={require("./assets/images/logo.png")}
                    style={styles.logo}
                    resizeMode='contain'
                />

                <Text
                    style={[
                        styles.title,
                        { color: isDark ? "#fcfdff" : "#000000" }
                    ]}
                >
                    No Internet Connection
                </Text>

                <Text
                    style={[
                        styles.subtitle,
                        { color: isDark ? "#71717b" : "#6b6b7b" }
                    ]}
                >
                    Elvox requires an active internet connection.
                </Text>

                <Pressable
                    onPress={retry}
                    style={({ pressed }) => [
                        styles.retryButton,
                        pressed && styles.retryPressed
                    ]}
                >
                    <Text style={styles.retryText}>Retry</Text>
                </Pressable>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView
                style={[
                    styles.container,
                    { backgroundColor: isDark ? "#000000" : "#f7f7f7" }
                ]}
                edges={["top", "bottom"]}
            >
                {loading && <FullScreenLoader />}

                <WebView
                    ref={webRef}
                    source={{ uri: WEB_URL }}
                    style={{ backgroundColor: isDark ? "#000000" : "#f7f7f7" }}
                    javaScriptEnabled
                    domStorageEnabled
                    onMessage={handleWebViewMessage}
                    sharedCookiesEnabled
                    thirdPartyCookiesEnabled
                    onLoadStart={() => {
                        if (!hasLoadedOnce.current) {
                            setLoading(true)
                        }
                    }}
                    onLoadEnd={() => {
                        setLoading(false)
                        hasLoadedOnce.current = true
                    }}
                    scalesPageToFit={false}
                    setBuiltInZoomControls={false}
                    setDisplayZoomControls={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    onShouldStartLoadWithRequest={(request) => {
                        if (request.navigationType === "other") return true
                        return request.url.startsWith(WEB_URL)
                    }}
                    dataDetectorTypes={["none"]}
                    textZoom={100}
                    onNavigationStateChange={(navState) => {
                        setCanGoBack(navState.canGoBack)
                    }}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    logo: {
        width: 96,
        height: 96,
        marginBottom: 24
    },
    offlineContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24
    },
    title: {
        fontFamily: "Inter",
        fontSize: 18,
        fontWeight: "800",
        marginBottom: 8
    },
    subtitle: {
        fontFamily: "Inter",
        fontSize: 12,
        fontWeight: "400",
        textAlign: "center",
        marginBottom: 16
    },

    retryButton: {
        backgroundColor: "#765ac1",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center"
    },

    retryPressed: {
        transform: [{ scale: 0.9 }]
    },

    retryText: {
        color: "#fcfdff",
        fontSize: 14,
        fontWeight: "500"
    }
})

export default App
