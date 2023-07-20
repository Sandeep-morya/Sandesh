import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Badge from "../common/Badge";
import theme from "../../globalStyle";
import { router } from "expo-router";

interface IProps {
	room: number;
}

export default function Thread({ room }: IProps) {
	return (
		<Pressable
			style={styles.container}
			onPress={() => router.push(`/home/${room}`)}>
			<Pressable style={styles.imageWrapper}>
				<Image
					style={styles.image}
					source={{ uri: `https://picsum.photos/100?random=${room}` }}
					alt=""
				/>
			</Pressable>
			<View style={styles.wrapper}>
				<View style={styles.messageWrapper}>
					<Text numberOfLines={1} style={styles.sender}>
						Sandeep Maurya
					</Text>
					<View style={styles.messageData}>
						<Ionicons
							name="checkmark-done"
							size={20}
							color={theme.secondary.color}
						/>
						<Text style={styles.message} numberOfLines={1}>
							How are you
						</Text>
					</View>
				</View>
				<View style={styles.messageNoficationWrapper}>
					<Text style={styles.deliveryTime}>02:33pm</Text>
					<Badge count={1} />
				</View>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		borderRadius: 5,
		flexDirection: "row",
		gap: 10,
		alignItems: "center",
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
	wrapper: {
		flex: 1,
		flexDirection: "row",
		gap: 5,
	},
	messageWrapper: {
		flex: 1,
		alignItems: "flex-start",
		gap: 5,
	},
	messageData: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 5,
	},
	sender: {
		fontSize: 14,
		...theme.text,
		// fontWeight: "700",
		fontFamily: "open-sans-semi-bold",
	},
	message: {
		fontSize: 12,
		...theme.dimmedText,
	},
	messageNoficationWrapper: {
		height: "100%",
		gap: 10,
		marginRight: 10,
		justifyContent: "flex-start",
		alignItems: "flex-end",
	},
	deliveryTime: {
		fontSize: 10,
		...theme.text,
	},
});
