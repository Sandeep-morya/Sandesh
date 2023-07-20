import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { PropsWithChildren } from "react";
import theme from "../../globalStyle";
import Ionicons from "@expo/vector-icons/Ionicons";
interface IProps extends PropsWithChildren {
	onPress: () => void;
	isDisabled?: boolean;
	color?: any;
	icon?: any;
	bg?: any;
}

export default function Button({
	children,
	onPress,
	isDisabled,
	color,
	icon,
	bg,
}: IProps) {
	const styles = StyleSheet.create({
		buttonText: {
			fontSize: 15,
			...theme.text,
			color: color || theme.text.color,
		},
		buttonContainer: {
			flexDirection: "row",
			alignItems: "center",
			backgroundColor: bg || "none",
			paddingVertical: 10,
			paddingHorizontal: 20,
			borderRadius: 5,
		},

		icon: {
			marginRight: 10,
		},
	});
	return (
		<TouchableOpacity
			disabled={isDisabled}
			onPress={onPress}
			style={styles.buttonContainer}>
			{icon && (
				<Ionicons
					name={icon}
					size={20}
					color={color || theme.text.color}
					style={styles.icon}
				/>
			)}
			<Text style={styles.buttonText}>Start New Chat</Text>
		</TouchableOpacity>
	);
}
