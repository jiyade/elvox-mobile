import "react-native-get-random-values"
import * as SecureStore from "expo-secure-store"
import { v4 as uuidv4 } from "uuid"

const DEVICE_ID_KEY = "elvox_device_id"

export const getDeviceId = async () => {
    let deviceId = await SecureStore.getItemAsync(DEVICE_ID_KEY)

    if (!deviceId) {
        deviceId = uuidv4()
        await SecureStore.setItemAsync(DEVICE_ID_KEY, deviceId)
    }

    return deviceId
}
