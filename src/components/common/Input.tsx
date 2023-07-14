import { View, Text, TextInput, StyleSheet } from "react-native";
import theme from "../../globalStyle";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";

interface IProps {
	value: string;
	onChangeText: (e: string) => void;
	placeholder: string;
	icon?: any;
	secure?: boolean;
}

export default function Input(props: IProps) {
	const [show, setShow] = useState(props.secure);
	return (
		<View style={styles.wrapper}>
			<Feather name={props.icon} size={20} color={theme.dimmedText.color} />
			<TextInput
				style={styles.textInput}
				placeholderTextColor={"#fff3"}
				{...props}
				secureTextEntry={show}
			/>
			{props.secure && (
				<Feather
					name={show ? "eye" : "eye-off"}
					size={20}
					color={theme.dimmedText.color}
					onPress={() => setShow((e) => !e)}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		width: "100%",
		height: 60,
		padding: 10,
		borderWidth: 1,
		borderColor: "#fff3",
		borderRadius: 5,
		flexDirection: "row",
		alignItems: "center",
	},
	textInput: {
		...theme.text,
		fontSize: 15,
		marginLeft: 10,
		flex: 1,
	},
});
