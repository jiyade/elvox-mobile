import { Text, View } from "react-native"
import { useEffect, useState } from "react"
import api from "../api/api"

const DashboardScreen = () => {
    const [user, setUser] = useState({})

    useEffect(() => {
        const fetchMe = async () => {
            try {
                const res = await api.get("/auth/me")
                setUser(res.data)
            } catch (err) {
                console.log(err)
            }
        }

        fetchMe()
    }, [])

    return (
        <View>
            <Text>Dashboard, Welcome {user.name}</Text>
        </View>
    )
}

export default DashboardScreen
