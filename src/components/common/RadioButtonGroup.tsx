import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import RadioButton from "./RadioButton";
import { ValueOf } from "react-native-gesture-handler/lib/typescript/typeUtils";
interface IProps {
	horizontal: boolean;
	options: string[];
	active: string;
	setActive: (x: string) => void;
}

export default function RadioButtonGroup({
	horizontal,
	options,
	active,
	setActive,
}: IProps) {
	return (
		<View
			style={[
				styles.container,
				{ flexDirection: horizontal ? "row" : "column" },
			]}>
			{options.map((title, index) => {
				return (
					<RadioButton
						key={index + title + "radio-button"}
						title={title}
						active={active === title}
						setActive={setActive}
					/>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: 10,
	},
});
