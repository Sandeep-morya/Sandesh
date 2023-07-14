import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import { PropsWithChildren } from "react";
import { LinearGradient } from "expo-linear-gradient";
import theme from "../../globalStyle";

interface IProps extends PropsWithChildren {
	onPress: () => void;
	variant?: "outline" | "default";
	isLoading?: boolean;
}

export default function GradientButton({
	children,
	onPress,
	variant,
	isLoading,
}: IProps) {
	return (
		<LinearGradient
			// Button Linear Gradient
			colors={[theme.primary.color, theme.secondary.color]}
			start={{ x: 0.45, y: 0.1 }}
			style={styles.buttonContainer}>
			{isLoading && (
				<View style={styles.loaderWrapper}>
					<ActivityIndicator
						style={styles.loader}
						color={"white"}
						size={"large"}
					/>
				</View>
			)}
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
		position: "relative",
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
		fontSize: 15,
	},
	loaderWrapper: {
		position: "absolute",
		zIndex: 10,
		backgroundColor: "#000a",
		width: "100%",
		height: "100%",
		alignItems: "flex-start",
		justifyContent: "center",
		borderRadius: 5,
	},
	loader: {
		width: "35%",
	},
});
