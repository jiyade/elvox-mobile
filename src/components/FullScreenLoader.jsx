import {
    View,
    StyleSheet,
    Animated,
    Easing,
    useColorScheme
} from "react-native"
import { useEffect, useRef } from "react"

export default function FullScreenLoader() {
    const scheme = useColorScheme()
    const isDark = scheme === "dark"

    const rotateAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 1200,
                easing: Easing.linear,
                useNativeDriver: true
            })
        ).start()
    }, [rotateAnim])

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"]
    })

    return (
        <View
            style={[
                styles.overlay,
                {
                    backgroundColor: isDark ? "#000000" : "#f7f7f7"
                }
            ]}
        >
            <Animated.Image
                source={require("../../assets/images/logo.png")}
                style={[styles.logo, { transform: [{ rotate }] }]}
                resizeMode='contain'
            />
        </View>
    )
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    logo: {
        width: 50,
        height: 50
    }
})
