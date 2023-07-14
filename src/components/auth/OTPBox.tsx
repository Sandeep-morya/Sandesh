import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import theme from "../../globalStyle";

interface IProps {
	filled: boolean;
	value: string;
	active: boolean;
}

export default function OTPBox({ active, filled, value }: IProps) {
	const borderColor =
		active || filled ? theme.primary.color : theme.dimmedText.color;
	return (
		<View style={[styles.otpBoxWrapper, { borderColor }]}>
			<Text style={styles.otpText}>{value}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	// ={`w-[33] h-[40] rounded-md border-2 ${borderColor} items-center justify-center m-1`
	otpBoxWrapper: {
		width: 35,
		height: 40,
		borderRadius: 5,
		borderWidth: 2,
		justifyContent: "center",
		alignItems: "center",
	},
	otpText: {
		alignSelf: "center",
		...theme.secondary,
		fontSize: 20,
		fontWeight: "700",
	},
});
