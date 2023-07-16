import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "../../src/utils/redux";

export default function Messages() {
	const { info } = useSelector((store) => store.user);
	console.log(info?.verified, info?.username);
	return (
		<View>
			<Text>Messages</Text>
		</View>
	);
}
