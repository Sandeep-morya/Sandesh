import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useSlice } from "../redux/utils";

export default function ChatHeader() {
	const { mode } = useSlice("appSettings");
	const router = useRouter();
	return (
		<SafeAreaView className="bg-[#1da3dd]">
			<View className="h-[60] flex-row justify-between items-center">
				<View className="flex-row items-center gap-2">
					<MaterialIcons
						style={{ paddingHorizontal: 5 }}
						name="keyboard-backspace"
						size={25}
						color="white"
						onPress={() => router.back()}
					/>
					<Image
						className="w-[50] h-[50] rounded-full"
						source={{ uri: "https://picsum.photos/50" }}
						alt="user-avatar"
					/>
					<View className="w-[100]">
						<Text
							numberOfLines={1}
							className="text-base text-gray-100 font-semibold">
							Roundom Kumar Maurya
						</Text>
						<Text numberOfLines={1} className="text-xs text-gray-100">
							last seen 3:14pm
						</Text>
					</View>
				</View>
				<View className="flex-row items-center gap-6 px-2">
					<Feather name="video" size={24} color="white" />
					<MaterialIcons name="add-call" size={24} color="white" />
					<Feather name="info" size={24} color="white" />
				</View>
			</View>
		</SafeAreaView>
	);
}
