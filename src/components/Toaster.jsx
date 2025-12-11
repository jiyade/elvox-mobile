// Toaster.js
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import { useEffect, useRef } from "react"
import { Animated, Easing, Text, View } from "react-native"
import { useToastStore } from "../stores"

// If you use NativeWind, className works; otherwise replace styles accordingly.
export default function Toaster() {
    const toast = useToastStore((s) => s.toast)
    const slide = useRef(new Animated.Value(-20)).current // vertical offset
    const opacity = useRef(new Animated.Value(0)).current

    useEffect(() => {
        if (toast) {
            // in
            Animated.parallel([
                Animated.timing(slide, {
                    toValue: 0,
                    duration: 220,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: true
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true
                })
            ]).start()
        } else {
            // out
            Animated.parallel([
                Animated.timing(slide, {
                    toValue: -20,
                    duration: 180,
                    easing: Easing.in(Easing.cubic),
                    useNativeDriver: true
                }),
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 160,
                    useNativeDriver: true
                })
            ]).start()
        }
    }, [toast, slide, opacity])

    if (!toast) return null

    const isSuccess = toast.type === "success"
    const iconName = isSuccess ? "check-circle" : "cancel" // material icons
    const iconColor = isSuccess ? "#16a34a" : "#ef4444"

    return (
        <View className='w-full absolute top-20 flex items-center justify-center z-50 pointer-events-none'>
            <Animated.View
                style={{
                    transform: [{ translateY: slide }],
                    opacity
                }}
                className='pointer-events-auto'
            >
                <View className='bg-card-light dark:bg-card-dark shadow-xl border border-black/10 dark:border-white/10 min-w-60 max-w-96 min-h-16 rounded-xl flex justify-center items-center'>
                    <View className='flex flex-row items-center p-2 gap-3'>
                        <MaterialIcons
                            name={iconName}
                            size={26}
                            color={iconColor}
                        />
                        <Text className='text-primary-light dark:text-primary-dark text-lg text-center shrink'>
                            {toast.message}
                        </Text>
                    </View>
                </View>
            </Animated.View>
        </View>
    )
}
