import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";
import { useSelector } from "../../src/utils/redux";
import theme from "../../src/globalStyle";
import { TextInput } from "react-native-gesture-handler";
import GradientButton from "../../src/components/common/GradientButton";
import GradientInput from "../../src/components/common/GradientInput";
import Input from "../../src/components/common/Input";

export default function Messages() {
	const { info } = useSelector((store) => store.user);
	// console.log(info?.verified, info?.username);
	const [searchText, setSearchText] = useState("");
	return (
		<ScrollView style={theme.bg} contentContainerStyle={{ padding: 8 }}>
			<View style={styles.searchContainer}>
				<GradientInput
					value={searchText}
					onChangeText={setSearchText}
					placeholder="Search"
				/>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	searchContainer: {
		width: "95%",
		alignSelf: "center",
	},
});
