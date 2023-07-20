import { View, Text, StyleSheet } from "react-native";
import React from "react";
import theme from "./globalStyle";

interface IMessage {
	id: number;
	content: string;
	user: string;
}

export default function Message({ user, content }: IMessage) {
	const style = user === "akash" ? styles.akashMessage : styles.sandeepMessage;

	return (
		<View style={[styles.messageContainer, style]}>
			<Text style={[styles.messageText, user === "akash" && styles.akashText]}>
				{content}
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	messageContainer: {
		margin: 1,
		padding: 2,
		maxWidth: "70%",
		borderRadius: 999,
	},
	sandeepMessage: {
		backgroundColor: "white",
		alignSelf: "flex-end",
		borderBottomRightRadius: 0,
		paddingVertical: 5,
		paddingHorizontal: 10,
		marginVertical: 5,
	},
	akashMessage: {
		backgroundColor: theme.primary.color,
		alignSelf: "flex-start",
		borderBottomLeftRadius: 0,
		paddingVertical: 5,
		paddingHorizontal: 10,
		marginVertical: 5,
	},
	messageText: {
		color: "black",
		fontFamily: "open-sans",
		fontSize: 14,
	},
	akashText: {
		color: "white",
	},
});
