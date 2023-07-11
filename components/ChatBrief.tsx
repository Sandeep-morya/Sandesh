import { View, Pressable, Image, Text } from "react-native";
import React from "react";
import { useSlice } from "../redux/utils";
import { useRouter } from "expo-router";

export default function ChatBrief({ x }: { x: number }) {
	const { mode } = useSlice("appSettings");
	const router = useRouter();

	const text = mode === "light" ? "text-gray-700" : "text-gray-200";
	return (
		<>
			<Pressable
				onPress={() => {
					router.push(`/home/chat/${x}`);
				}}
				className="flex-row gap-2 p-2 items-center">
				<Pressable className="w-[60] h-[60] rounded-full relative items-center">
					<Image
						className="w-full h-full rounded-full "
						source={{ uri: `https://picsum.photos/50?random=${x}` }}
						alt=""
					/>
				</Pressable>
				<View className="flex-1 flex-row justify-between items-start">
					<View>
						<Text className={`text-base ${text} font-semibold`}>
							Random Kumar Maurya
						</Text>
						<Text className="text-gray-500">Random Kumar Maurya</Text>
					</View>
					<Text className="text-gray-500">{"08:20am"}</Text>
				</View>
			</Pressable>
			<View
				className={`w-[90%] mx-auto h-[1] ${
					mode === "dark" ? "bg-gray-800" : "bg-gray-200"
				}`}
			/>
		</>
	);
}
