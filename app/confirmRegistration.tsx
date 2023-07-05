import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useSlice } from "../redux/utils";
import { useRouter } from "expo-router";

export default function confirmRegistration() {
	const { mode } = useSlice("appSettings");
	const router = useRouter();
	const bg = mode === "light" ? "bg-gray-200" : "bg-slate-800";
	const text = mode === "light" ? "text-black" : "text-white";

	return (
		<SafeAreaView className={`flex-1 ${bg} p-4`}>
			<View className="items-start ">
				<Ionicons
					name="arrow-back"
					color={mode === "light" ? "black" : "white"}
					size={25}
					onPress={() => router.back()}
				/>
			</View>
			<View>{/* <Image /> */}</View>
			<View className="items-center">
				<Text className={`${text} text-xl font-bold mt-4 mb-1`}>
					Check Your Email
				</Text>
				<Text className={`text-gray-500`}>
					Please enter the code we have send to your email
				</Text>
				<Text className={`text-gray-500`}>saabmaurya@gmail.com</Text>
			</View>
		</SafeAreaView>
	);
}
