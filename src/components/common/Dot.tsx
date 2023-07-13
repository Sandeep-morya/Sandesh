import { View, Text } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import theme from "../../globalStyle";

interface IDot {
	active?: boolean;
}

const Dot = ({ active }: IDot) => {
	const color = active ? theme.primary.color : theme.dimmedText.color;
	return (
		<Entypo name="dot-single" style={{ margin: -6 }} size={28} color={color} />
	);
};

export default Dot;
