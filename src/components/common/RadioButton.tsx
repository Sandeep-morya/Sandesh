import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Dispatch, SetStateAction } from "react";
import theme from "../../globalStyle";
interface IProps {
	active: boolean;
	setActive: (x: string) => void;
	title: string;
}
export default function RadioButton({ active, setActive, title }: IProps) {
	return (
		<TouchableOpacity
			activeOpacity={0.5}
			style={styles.wrapper}
			onPress={() => setActive(title)}>
			<View style={[styles.button]}>
				<View
					style={[
						styles.core,
						{ backgroundColor: active ? "white" : "transparent" },
					]}></View>
			</View>
			<Text style={[styles.text]}>{title}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	button: {
		width: 20,
		height: 20,
		borderWidth: 1,
		borderRadius: 100,
		borderColor: "white",
		justifyContent: "center",
		alignItems: "center",
	},
	core: {
		width: "75%",
		height: "75%",
		borderRadius: 100,
	},
	text: {
		...theme.text,
	},
});
