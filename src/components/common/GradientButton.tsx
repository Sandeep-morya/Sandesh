import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { PropsWithChildren } from "react";
import { LinearGradient } from "expo-linear-gradient";
import theme from "../../globalStyle";

interface IProps extends PropsWithChildren {
	onPress: () => void;
	variant?: "outline" | "default";
}

export default function GradientButton({ children, onPress, variant }: IProps) {
	return (
		<LinearGradient
			// Button Linear Gradient
			colors={[theme.primary.color, theme.secondary.color]}
			start={{ x: 0.45, y: 0.1 }}
			style={styles.buttonContainer}>
			<TouchableOpacity
				onPress={onPress}
				activeOpacity={0.7}
				style={[
					styles.pressable,
					{
						backgroundColor: variant === "outline" ? "#130429" : "#130429cc",
					},
				]}>
				<Text style={styles.buttonText}>{children}</Text>
			</TouchableOpacity>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	buttonContainer: {
		width: "100%",
		height: 60,
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
	},
	pressable: {
		width: "99%",
		height: "95%",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 5,
	},
	buttonText: {
		...theme.text,
		...theme.textShadow,
		fontFamily: "open-sans-semi-bold",
		fontSize: 16,
	},
});
