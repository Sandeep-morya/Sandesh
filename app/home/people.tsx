import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import theme from "../../src/globalStyle";
import Input from "../../src/components/common/Input";

export default function People() {
	const [searchText, setSearchText] = useState("");
	return (
		<ScrollView
			style={{ backgroundColor: "#100020" }}
			contentContainerStyle={{ padding: 8 }}>
			{/* <Text style={styles.heading}>Find Peoples around the world</Text> */}
			<Input
				value={searchText}
				onChangeText={setSearchText}
				placeholder="Search a user by username"
				borderRadius={100}
				height={55}
				icon="search"
			/>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	heading: {
		...theme.text,
	},
});
