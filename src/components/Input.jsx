import { useColorScheme } from "nativewind"
import { TextInput } from "react-native"

const Input = ({
    value,
    onChangeText,
    placeholder,
    keyboardType = "default",
    autoCapitalize,
    secureTextEntry = false
}) => {
    const { colorScheme } = useColorScheme()

    const placeholderColor = colorScheme === "dark" ? "#6b6b7b" : "#888794"

    return (
        <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={placeholderColor}
            className='w-full h-11 px-3 rounded-md bg-field-light dark:bg-field-dark text-primary-light dark:text-primary-dark'
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            secureTextEntry={secureTextEntry}
        />
    )
}

export default Input
