import { Image, View } from "react-native"

const Loader = () => {
    return (
        <View className='flex-1 justify-center items-center bg-transparent'>
            <Image
                source={require("../../assets/images/logo-no-text.png")}
                style={{ width: 50, height: 50 }}
                resizeMode='contain'
            />
        </View>
    )
}

export default Loader
