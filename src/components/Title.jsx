import { Text } from "react-native"

const Title = ({ title, className = "" }) => {
    return (
        <Text
            className={`text-primary-light dark:text-primary-dark text-center font-bold ${className}`}
        >
            {title}
        </Text>
    )
}

export default Title
