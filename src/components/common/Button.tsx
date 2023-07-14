import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { PropsWithChildren } from "react";
import theme from "../../globalStyle";

interface IProps extends PropsWithChildren {
	onPress: () => void;
	isDisabled?: boolean;
}

export default function Button({ children, onPress, isDisabled }: IProps) {
	return (
		<TouchableOpacity
			disabled={isDisabled}
			onPress={onPress}
			style={styles.wrapper}>
			<Text style={styles.buttonText}>{children}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		width: "100%",
		height: 60,
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonText: {
		fontSize: 15,
		...theme.text,
	},
});
