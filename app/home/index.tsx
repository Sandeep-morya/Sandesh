import { View, Text } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { useSlice } from "../../redux/utils";
import { StatusBar } from "expo-status-bar";
import { FlatList } from "react-native-gesture-handler";
import StoryBubble from "../../components/StoryBubble";
import ChatBrief from "../../components/ChatBrief";

export default function index() {
	const { mode } = useSlice("appSettings");
	const router = useRouter();

	const bg = mode === "light" ? "bg-gray-100" : "bg-slate-800";
	const text = mode === "light" ? "text-black" : "text-white";

	return (
		<View className={`${bg} flex-1`}>
			<View>
				<FlatList
					data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
					renderItem={({ item }) => <StoryBubble x={item} />}
					keyExtractor={(index) => index + "story-bubble"}
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{
						columnGap: 10,
						padding: 10,
						paddingBottom: 40,
					}}
				/>
			</View>
			<View className={`flex-1 pt-2 bg-gray-900 rounded-t-xl shadow`}>
				<FlatList
					data={[11, 12, 13, 14, 15, 16, 17, 18, 19, 20]}
					renderItem={({ item }) => <ChatBrief x={item} />}
					keyExtractor={(index) => index + "chat-brief"}
				/>
			</View>

			<StatusBar style="light" />
		</View>
	);
}
