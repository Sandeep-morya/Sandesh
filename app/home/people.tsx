import { View, Text, ScrollView } from "react-native";
import React from "react";
import theme from "../../src/globalStyle";

export default function People() {
	return (
		<ScrollView style={theme.bg} contentContainerStyle={{ padding: 8 }}>
			<Text>People</Text>
		</ScrollView>
	);
}
