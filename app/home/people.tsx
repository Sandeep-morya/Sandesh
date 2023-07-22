import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import theme from "../../src/globalStyle";
import Input from "../../src/components/common/Input";
import useSocket from "../../src/hooks/useSocket";
import ActiveUsers from "../../src/components/people/ActiveUsers";
import Tabs from "../../src/components/common/tabs";

const tabs = ["FindUser", "OnlineUsers"];

export default function People() {
	const socket = useSocket();
	const [searchText, setSearchText] = useState("");
	const [tabIndex, setTabIndex] = useState(0);

	const styles = StyleSheet.create({
		heading: {
			...theme.text,
		},
		tabsContainer: {
			width: "100%",
		},
		findUsers: {
			width: "100%",
			padding: 10,
		},
	});

	return (
		<ScrollView
			style={{ backgroundColor: "#100020" }}
			contentContainerStyle={{ padding: 10, rowGap: 10, alignItems: "center" }}>
			<Tabs {...{ tabIndex, setTabIndex, tabs }} />
			{/* Add the rest of your components and code here */}
			<View style={styles.tabsContainer}>
				{tabIndex === 1 && <ActiveUsers />}
				{tabIndex === 0 && (
					<View style={styles.findUsers}>
						<Input
							value={searchText}
							onChangeText={setSearchText}
							placeholder="Search a user by name or username"
							borderRadius={100}
							height={55}
							icon="search"
						/>
					</View>
				)}
			</View>
		</ScrollView>
	);
}
