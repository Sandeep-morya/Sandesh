import { View, StyleSheet } from "react-native";
import React from "react";

export default function Divider() {
	return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
	divider: {
		margin: 10,
		width: "100%",
		height: 1,
		// backgroundColor: "#ffffff11",
	},
});
