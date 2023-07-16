import { View, Text, ScrollView } from "react-native";
import React from "react";
import theme from "../../src/globalStyle";

export default function Calls() {
	return (
		<ScrollView style={theme.bg} contentContainerStyle={{ padding: 8 }}>
			<Text>Calls</Text>
		</ScrollView>
	);
}
