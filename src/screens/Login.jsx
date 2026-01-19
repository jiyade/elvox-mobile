import { useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react"
import { View } from "react-native"

import FullScreenLoader from "../components/FullScreenLoader"
import LoginForm from "../components/LoginForm"
import Logo from "../components/Logo"
import Title from "../components/Title"
import { useAuthStore } from "../stores"

const LoginScreen = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { isAuthenticated } = useAuthStore()
    const navigation = useNavigation()

    useEffect(() => {
        if (isAuthenticated) {
            navigation.navigate("Dashboard")
        }
    }, [isAuthenticated, navigation])

    return (
        <>
            <View className='flex-1 justify-center items-center bg-bg-light dark:bg-bg-dark py-3'>
                <View>
                    <Logo
                        width={150}
                        height={150}
                    />
                </View>

                <View className='w-11/12 bg-card-light dark:bg-card-dark rounded-xl shadow-lg items-center gap-10 px-10 py-11'>
                    <Title
                        title='Login'
                        className='text-4xl'
                    />
                    <LoginForm setIsLoading={setIsLoading} />
                </View>
            </View>

            {isLoading && <FullScreenLoader />}
        </>
    )
}

export default LoginScreen
