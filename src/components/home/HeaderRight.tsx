import { View, Text, StyleSheet } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";

interface IProps {
	tintColor?: string | undefined;
	pressColor?: string | undefined;
	pressOpacity?: number | undefined;
}
export default function HeaderRight({ tintColor }: IProps) {
	return (
		<View style={styles.headerRightWrapper}>
			<AntDesign name="camerao" size={24} color={tintColor} />
			<AntDesign
				name="contacts"
				size={22}
				color={tintColor}
				onPress={() => router.push("home/chat/2")}
			/>
			<AntDesign name="setting" size={22} color={tintColor} />
		</View>
	);
}

const styles = StyleSheet.create({
	headerRightWrapper: {
		flexDirection: "row",
		paddingHorizontal: 20,
		gap: 30,
	},
});
