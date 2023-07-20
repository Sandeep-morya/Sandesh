import { View, Text, StyleSheet } from "react-native";
import React from "react";
import theme from "../../globalStyle";
export default function Badge({ count }: { count: number }) {
	return (
		<View style={styles.badgeWrapper}>
			<Text style={styles.badgeText}>{count}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	badgeWrapper: {
		width: 20,
		height: 20,
		borderRadius: 100,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: theme.primary.color,
	},
	badgeText: {
		fontFamily: "open-sans-semi-bold",
		color: "white",
		fontSize: 11,
	},
});
