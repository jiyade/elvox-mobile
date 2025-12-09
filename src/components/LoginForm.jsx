import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import Constants from "expo-constants"
import { useColorScheme } from "nativewind"
import { useState } from "react"
import { Alert, Pressable, Text, TextInput, View } from "react-native"
import useAuthStore from "../stores/authStore"
import validateEmailOrPhone from "../utils/validateEmailOrPhone"

const { API_URL } = Constants.expoConfig.extra

const LoginForm = ({ setIsLoading }) => {
    const [eop, setEop] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState({ eop: "", password: "" })

    const navigation = useNavigation()
    const { login } = useAuthStore()

    const { colorScheme } = useColorScheme()

    const placeholderColor = colorScheme === "dark" ? "#6b6b7b" : "#888794"

    const validate = () => {
        const newErrors = { eop: "", password: "" }

        if (!eop) {
            newErrors.eop = "Email or phone is required"
        } else if (typeof validateEmailOrPhone === "function") {
            const result = validateEmailOrPhone(eop)
            if (result !== true && result) {
                newErrors.eop = result
            }
        }

        if (!password) {
            newErrors.password = "Password is required"
        } else if (password.length < 8) {
            newErrors.password = "At least 8 characters"
        }

        setErrors(newErrors)
        return !newErrors.eop && !newErrors.password
    }

    const onSubmit = async () => {
        if (!validate()) return

        try {
            setIsLoading(true)
            const data = { eop, password }
            const res = await axios.post(`${API_URL}/auth/login`, data)
            const user = await res.data
            console.log(user)
            if (user) {
                login(user)
                navigation.replace("Dashboard")
                Alert.alert("Success", "Welcome back!")
            }
        } catch (err) {
            console.log(err)
            Alert.alert("Error", err.response.data.error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <View className='w-full flex flex-col gap-6'>
            <View className='flex flex-col gap-2'>
                <Text className='text-primary-light dark:text-primary-dark'>
                    Email or Phone
                </Text>
                <TextInput
                    value={eop}
                    onChangeText={setEop}
                    placeholder='Enter your email or phone'
                    placeholderTextColor={placeholderColor}
                    className='w-full h-11 px-3 rounded-md bg-field-light dark:bg-field-dark text-primary-light dark:text-primary-dark'
                    keyboardType='email-address'
                    autoCapitalize='none'
                />
                {errors.eop ? (
                    <Text className='text-xs text-red-500 mt-1 font-medium'>
                        {errors.eop}
                    </Text>
                ) : null}
            </View>

            <View className='flex flex-col gap-2'>
                <Text className='text-primary-light dark:text-primary-dark'>
                    Password
                </Text>
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder='Enter your password'
                    placeholderTextColor={placeholderColor}
                    secureTextEntry
                    className='w-full h-11 px-3 rounded-md bg-field-light dark:bg-field-dark text-primary-light dark:text-primary-dark'
                />
                {errors.password ? (
                    <Text className='text-xs text-red-500 mt-1 font-medium'>
                        {errors.password}
                    </Text>
                ) : null}
            </View>

            <View className='pt-2'>
                <Pressable
                    className='w-full h-11 rounded-md items-center justify-center bg-accent active:opacity-80'
                    onPress={onSubmit}
                >
                    <Text className='text-lg text-white font-medium'>
                        Login
                    </Text>
                </Pressable>
            </View>

            <View className='flex flex-row items-center justify-between mt-2'>
                <Pressable onPress={() => navigation.navigate("Signup")}>
                    <Text className='text-link'>
                        Don&apos;t have an account?{"\n"}Sign Up
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => navigation.navigate("ForgotPassword")}
                >
                    <Text className='text-link'>Forgot{"\n"}password?</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default LoginForm
