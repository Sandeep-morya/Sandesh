import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import theme from "../../globalStyle";
import AntDesign from "@expo/vector-icons/AntDesign";
interface IProps {
	value: string;
	onChangeText: (e: string) => void;
	placeholder: string;
}
export default function GradientInput(props: IProps) {
	return (
		<LinearGradient
			// Button Linear Gradient
			colors={[theme.primary.color, theme.secondary.color]}
			start={{ x: 0.45, y: 0.1 }}
			style={styles.inputContainer}>
			<View style={styles.inputWrapper}>
				<AntDesign
					name="search1"
					size={20}
					style={{ marginLeft: 5 }}
					color={theme.primary.color}
				/>
				<TextInput
					style={styles.textInput}
					placeholderTextColor={"#fff4"}
					{...props}
				/>
				{props.value.length > 0 && (
					<AntDesign
						name="close"
						size={20}
						style={{ paddingHorizontal: 5, zIndex: 10 }}
						color={theme.secondary.color}
						onPress={() => props.onChangeText("")}
					/>
				)}
			</View>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	inputContainer: {
		width: "100%",
		height: 50,
		borderRadius: 100,
		justifyContent: "center",
		alignItems: "center",
	},
	inputWrapper: {
		width: "99.5%",
		height: "95%",
		borderRadius: 100,
		alignItems: "center",
		backgroundColor: "#130429dd",
		flexDirection: "row",
		padding: 10,
		gap: 5,
	},
	textInput: {
		color: "white",
		fontSize: 15,
		marginLeft: 10,
		flex: 1,
		letterSpacing: 1,
		fontFamily: "open-sans",
	},
});
