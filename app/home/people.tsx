import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useCallback, useState } from "react";
import theme from "../../src/globalStyle";
import Input from "../../src/components/common/Input";
import useSocket from "../../src/hooks/useSocket";
import Button from "../../src/components/common/Button";
import ActiveUsers from "../../src/components/people/ActiveUsers";

export default function People() {
	const socket = useSocket();
	const [searchText, setSearchText] = useState("");
	const sendInstantMessage = useCallback(
		(message: string) => {
			if (socket) {
				socket.emit("client:send-message", message);
			}
		},
		[socket],
	);
	return (
		<ScrollView
			style={{ backgroundColor: "#100020" }}
			contentContainerStyle={{ padding: 10 }}>
			{/* <Text style={styles.heading}>Find Peoples around the world</Text> */}
			<Input
				value={searchText}
				onChangeText={setSearchText}
				placeholder="Search a user by username"
				borderRadius={100}
				height={55}
				icon="search"
			/>

			<View style={styles.tabs}>
				<ActiveUsers />
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	heading: {
		...theme.text,
	},
	tabs: {
		padding: 10,
	},
});
