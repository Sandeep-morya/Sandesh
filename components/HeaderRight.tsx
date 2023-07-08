import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
interface IProps {
	tintColor?: string | undefined;
	pressColor?: string | undefined;
	pressOpacity?: number | undefined;
}
export default function HeaderRight({ tintColor }: IProps) {
	return (
		<View className="flex-row items-center gap-6 px-3">
			<Ionicons name="camera-outline" size={24} color={tintColor} />
			<Ionicons name="search" size={22} color={tintColor} />
			<Ionicons name="settings-outline" size={22} color={tintColor} />
		</View>
	);
}
