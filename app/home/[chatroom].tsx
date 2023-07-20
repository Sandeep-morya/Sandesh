import { View, Text } from "react-native";
import React from "react";
import { useGlobalSearchParams } from "expo-router";

export default function ChatRoom() {
	const { chatroom } = useGlobalSearchParams();
	return (
		<View>
			<Text>{chatroom}</Text>
		</View>
	);
}
