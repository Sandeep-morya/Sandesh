import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../common/Button";
import Ionicons from "@expo/vector-icons/Ionicons";
import theme from "../../globalStyle";
import GradientButton from "../common/GradientButton";
import { router } from "expo-router";

const EmptyMessageComponent = () => {
	return (
		<View style={styles.container}>
			<Ionicons
				name="chatbubbles-outline"
				color={theme.dimmedText.color}
				size={100}
				style={styles.icon}
			/>

			<Button
				icon="people"
				bg={theme.primary.color}
				onPress={() => router.push("/home/people")}>
				Start New Chat
			</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: 500,
		padding: 10,
		alignItems: "center",
		borderRadius: 10,
		gap: 20,
	},
	icon: {
		marginTop: 200,
	},
});

export default EmptyMessageComponent;
