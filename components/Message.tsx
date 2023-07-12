import { View, Text } from "react-native";
import React from "react";
interface IMessage {
	id: number;
	content: string;
	user: string;
}

export default function Message({ user, content }: IMessage) {
	const style =
		user === "akash"
			? "bg-teal-500 self-start rounded-bl-md"
			: "bg-white self-end rounded-br-md";
	return (
		<View className={`m-1 p-2 max-w-[70%] rounded-full ${style}`}>
			<Text
				className={`text-whtie ${user === "akash" && "text-white"} text-base`}>
				{content}
			</Text>
		</View>
	);
}
