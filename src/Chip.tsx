import { Pressable, Text } from "react-native";
import React, { useState } from "react";

export default function Chip({ title }: { title: string }) {
	return (
		<Pressable
			style={({ pressed }) => ({
				backgroundColor: pressed ? "#1da3dd" : "#eeeeee",
				borderRadius: 50,
				paddingVertical: 5,
				paddingHorizontal: 10,
			})}>
			{({ pressed }) => (
				<Text style={{ color: pressed ? "white" : "black" }}>{title}</Text>
			)}
		</Pressable>
	);
}
