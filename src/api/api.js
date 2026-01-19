import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Constants from "expo-constants"

const { API_URL } = Constants.expoConfig.extra

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000
})

api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem("token")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

export default api
