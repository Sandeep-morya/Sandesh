import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import theme from "../../globalStyle";
import { AntDesign } from "@expo/vector-icons";

interface IProps {
	value: string;
	onChangeText: (e: string) => void;
	placeholder: string;
	icon?: any;
}

export default function Input(props: IProps) {
	return (
		<View style={styles.wrapper}>
			<AntDesign name={props.icon} size={20} color={theme.dimmedText.color} />
			<TextInput
				style={styles.textInput}
				placeholderTextColor={"#fff3"}
				{...props}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		width: "100%",
		height: 60,
		padding: 10,
		borderWidth: 1,
		borderColor: "#fff3",
		borderRadius: 5,
		flexDirection: "row",
		alignItems: "center",
	},
	textInput: {
		...theme.text,
		fontSize: 15,
		marginLeft: 10,
		flex: 1,
	},
});
