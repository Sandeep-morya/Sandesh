import {
	View,
	Text,
	ActivityIndicator,
	StyleSheet,
	Pressable,
	Image,
} from "react-native";
import React from "react";
import { gql, useQuery } from "@apollo/client";
import theme from "../../globalStyle";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
const FIND_USER = gql`
	query FindUser($query: UserQuery) {
		findUser(query: $query) {
			name
			username
			image
			mobile
			gender
			bio
		}
	}
`;
export default function UserChip({ id }: { id: string }) {
	const { loading, error, data } = useQuery(FIND_USER, {
		variables: { query: { _id: id } },
	});
	if (loading) {
		return <ActivityIndicator />;
	}

	if (!data?.findUser) {
		return <></>;
	}
	const { image, name, username } = data.findUser;

	return (
		<View style={styles.userWrapper}>
			<Pressable style={styles.imageWrapper}>
				<Image style={styles.image} source={{ uri: image }} alt="" />
			</Pressable>
			<View style={styles.userdata}>
				<Text numberOfLines={1} style={styles.name}>
					{name}
				</Text>

				<Text style={styles.username} numberOfLines={1}>
					@{username}
				</Text>
			</View>
			<View style={styles.iconsContainer}>
				<Ionicons
					name="chatbubble-ellipses-outline"
					size={28}
					color={theme.primary.color}
					onPress={() =>
						router.push({
							pathname: `/home/${id}`,
							params: { id, image, name, username },
						})
					}
				/>
				<MaterialIcons
					name="info-outline"
					size={28}
					color={theme.secondary.color}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	userWrapper: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		padding: 8,
		// borderRadius: 5,
		// borderColor: theme.dimmedText.color,
		// borderWidth: 1,
	},
	imageWrapper: {
		width: 55,
		height: 55,
		borderRadius: 100,
		position: "relative",
		alignItems: "center",
	},
	image: {
		width: "100%",
		height: "100%",
		borderRadius: 100,
	},
	userdata: { flex: 1, gap: 5 },
	name: {
		fontSize: 15,
		...theme.text,
		// fontWeight: "700",
		fontFamily: "open-sans-semi-bold",
	},
	username: {
		...theme.dimmedText,
		fontSize: 12,
	},
	iconsContainer: {
		flexDirection: "row",
		gap: 20,
	},
});
