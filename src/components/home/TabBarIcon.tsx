import { View, StyleSheet } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import theme from "../../globalStyle";

interface IProps {
	name: any;
	focused?: boolean;
	size?: number;
	color?: any;
}

export default function TabBarIcon(props: IProps) {
	return (
		<View style={styles.iconWrapper}>
			<Ionicons
				name={props.name}
				color={props.focused ? theme.primary.color : props.color}
				size={props.focused ? 30 : 25}
			/>
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
