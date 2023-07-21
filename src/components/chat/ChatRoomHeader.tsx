import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import theme from "../../globalStyle";

export default function ChatroomHeader() {
	const router = useRouter();
	return (
		<View style={styles.container}>
			<View style={styles.leftSection}>
				<Ionicons
					name="chevron-back"
					size={25}
					color="white"
					onPress={() => router.back()}
				/>

				<Image
					style={styles.logo}
					source={{ uri: "https://picsum.photos/50" }}
					alt="user-avatar"
				/>
				<View style={styles.about}>
					<Text numberOfLines={1} style={styles.name}>
						Random Kumar Maurya
					</Text>
					<Text numberOfLines={1} style={styles.lastseen}>
						last seen 3:14pm
					</Text>
				</View>
			</View>
			<View style={styles.rightSection}>
				<Ionicons name="videocam-outline" size={24} color={theme.text.color} />
				<MaterialIcons name="add-call" size={24} color={theme.text.color} />
				<MaterialIcons name="info-outline" size={24} color={theme.text.color} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		// Add styles for the container if needed

		backgroundColor: "#130429",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 10,
		paddingVertical: 15,
		shadowColor: "white",
		shadowRadius: 5,
		shadowOpacity: 0.5,
		elevation: 1,
	},

	leftSection: {
		flexDirection: "row",
		alignItems: "center",
		gap: 5,
	},
	logo: {
		width: 40,
		height: 40,
		borderRadius: 25,
	},
	about: {
		width: 120,
		gap: 5,
		marginLeft: 5,
	},
	name: {
		fontSize: 14,
		...theme.text,
		// fontWeight: "700",
		fontFamily: "open-sans-semi-bold",
	},
	lastseen: {
		fontSize: 11,
		...theme.dimmedText,
	},
	rightSection: {
		flexDirection: "row",
		alignItems: "center",
		gap: 20,
	},
});
