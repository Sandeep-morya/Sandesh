import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { PropsWithChildren } from "react";
import theme from "../../globalStyle";

interface IProps extends PropsWithChildren {
	onPress: () => void;
}

export default function Button({ children, onPress }: IProps) {
	return (
		<TouchableOpacity onPress={onPress} style={styles.wrapper}>
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
		...theme.text,
		fontSize: 15,
	},
});
