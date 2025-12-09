import { useState } from "react"
import { Image, Pressable } from "react-native"

const Logo = ({
    width = 100,
    height = 100,
    className,
    onClick,
    textless = false
}) => {
    const [loaded, setLoaded] = useState(false)

    const imgSource = textless
        ? require("../../assets/images/logo-no-text.png")
        : require("../../assets/images/logo.png")

    return (
        <Pressable
            onPress={onClick}
            disabled={!onClick}
        >
            {loaded && (
                <Image
                    source={imgSource}
                    style={{ width, height }}
                    className={className}
                    onLoad={() => setLoaded(true)}
                    resizeMode='contain'
                />
            )}

            {/* Invisible preloader */}
            {!loaded && (
                <Image
                    source={imgSource}
                    style={{ width, height, opacity: 0 }}
                    onLoad={() => setLoaded(true)}
                    resizeMode='contain'
                />
            )}
        </Pressable>
    )
}

export default Logo
