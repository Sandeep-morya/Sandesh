import { View, StyleSheet } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

interface IProps {
	name: any;
	focused?: boolean;
	size?: number;
	color?: any;
}

export default function TabBarIcon(props: IProps) {
	return (
		<View
			style={[
				styles.iconWrapper,
				{ backgroundColor: props.focused ? "#fff2" : "none" },
			]}>
			<Ionicons name={props.name} color={props.color} size={25} />
		</View>
	);
}

const styles = StyleSheet.create({
	iconWrapper: {
		width: 50,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 100,
		marginBottom: 10,
	},
});
