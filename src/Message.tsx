import { View, Text, StyleSheet } from "react-native";
import React from "react";
import theme from "./globalStyle";
import { MessageType } from "../types";
import { useSelector } from "./utils/redux";

export default function Message({ sender, recipient, content }: MessageType) {
	const { info } = useSelector((store) => store.user);

	if (!info) {
		return <></>;
	}

	const style =
		sender === info._id ? styles.akashMessage : styles.sandeepMessage;

	return (
		<View style={[styles.messageContainer, style]}>
			<Text style={[styles.messageText]}>{content}</Text>
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
});
