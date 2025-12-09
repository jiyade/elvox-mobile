import { View } from "react-native"
import Loader from "./Loader"

const FullScreenLoader = ({ suspense }) => {
    return (
        <View
            className={`
                absolute inset-0 z-50 
                flex justify-center items-center
                ${
                    suspense
                        ? "bg-bg-light dark:bg-bg-dark"
                        : "bg-bg-light/70 dark:bg-bg-dark/70"
                }
            `}
            style={{ height: "100%", width: "100%" }}
        >
            <Loader />
        </View>
    )
}

export default FullScreenLoader
