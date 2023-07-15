import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";
import { IUser } from "../../../types";
import theme from "../../globalStyle";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
interface IProps {
	image: string;
}
const loading = false;

export default function UpdateProfilePicture({ image }: IProps) {
	return (
		<View style={styles.profilePictureWrapper}>
			<Image
				style={styles.profilePicture}
				source={require("../../../assets/no-user.jpg")}
				alt="user-profile-picture"
			/>
			{loading && (
				<View style={styles.loader}>
					<ActivityIndicator size={"large"} color={theme.primary.color} />
				</View>
			)}
			<LinearGradient
				// Button Linear Gradient
				colors={[theme.primary.color, theme.secondary.color]}
				start={{ x: 1, y: 0.1 }}
				style={styles.cameraWrapper}>
				<AntDesign name="camera" size={24} color={"white"} />
			</LinearGradient>
		</View>
	);
}

const styles = StyleSheet.create({
	profilePictureWrapper: {
		width: 200,
		height: 200,
		// borderWidth: 2,
		// borderColor: theme.dimmedText.color,
		position: "relative",
		borderRadius: 100,
		justifyContent: "center",
		alignItems: "center",
	},
	profilePicture: {
		width: "100%",
		height: "100%",
		borderRadius: 100,
	},
	loader: {
		width: "100%",
		height: "100%",
		backgroundColor: theme.text.color,
		position: "absolute",
		top: 0,
		left: 0,
		zIndex: 5,
		borderRadius: 100,
		justifyContent: "center",
		alignItems: "center",
	},
	cameraWrapper: {
		width: 50,
		height: 50,
		borderRadius: 100,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: theme.primary.color,
		zIndex: 10,
		position: "absolute",
		bottom: 10,
		right: 10,
	},
});
