import { View, Text, StyleSheet } from "react-native";
import React, { useMemo } from "react";
import { useSelector } from "../../utils/redux";
import UserChip from "./UserChip";
import theme from "../../globalStyle";

export default function ActiveUsers() {
	const { info } = useSelector((store) => store.user);
	const { activeUsers } = useSelector((store) => store.chatReducer);
	const users = useMemo(
		() =>
			activeUsers && info ? activeUsers.filter((id) => id != info._id) : null,

		[activeUsers, info],
	);
	if (!users) {
		return <></>;
	}
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Online Users</Text>
			{users.map((user) => (
				<UserChip key={user + "online-user"} id={user} />
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#332255",
		borderRadius: 10,
		padding: 5,
	},
	text: {
		...theme.text,
		...theme.headingMedium,
		textAlign: "center",
	},
});
