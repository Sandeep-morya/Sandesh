import { View, Text, StyleSheet, Image } from "react-native";
import React, { useLayoutEffect, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector, useSlice } from "../src/utils/redux";
import {
	fetchAppSettings,
	toggleColorMode,
} from "../src/toolkit/slices/appSettings";

import { Ionicons } from "@expo/vector-icons";
import theme from "../src/globalStyle";
import GradientButton from "../src/components/common/GradientButton";

import { Redirect, router } from "expo-router";
import Dot from "../src/components/common/Dot";
import { fetchUserData } from "../src/toolkit/slices/userSlice";

export default function Main() {
	const dispatch = useDispatch();
	const { mode } = useSelector((store) => store.appSettings);
	const { token, info } = useSelector((store) => store.user);

	const handleUserNavigate = useCallback(() => {
		console.log(info);
		if (token === "" || info === null) {
			router.replace("/register");
		} else if (info != null && info.username) {
			router.replace("/home");
		} else {
			router.replace({
				pathname: "/setup",
				params: {
					id: info._id,
					token,
				},
			});
		}
	}, [token, info]);

	useLayoutEffect(() => {
		dispatch(fetchUserData());
		dispatch(fetchAppSettings());
	}, [dispatch]);

	return (
		<SafeAreaView style={[styles.container, theme.bg]}>
			<View style={styles.icon}>
				<Ionicons
					name={mode === "dark" ? "moon" : "sunny"}
					size={30}
					color={mode === "dark" ? theme.primary.color : theme.secondary.color}
					onPress={() => dispatch(toggleColorMode())}
				/>
			</View>

			<View style={styles.logoContainer}>
				<Image
					style={styles.image}
					source={require("../assets/adaptive-icon.png")}
					alt="logo"
				/>
				<Text style={[theme.text, theme.headingLarge]}>Sandesh</Text>
				<Text style={theme.dimmedText}>The world's fastest messaging app.</Text>
				<Text style={theme.dimmedText}>It is free and secure.</Text>
				<View style={styles.dots}>
					<Dot active />
					<Dot />
					<Dot />
					<Dot />
					<Dot />
					<Dot />
				</View>
			</View>
			<View style={styles.button}>
				<GradientButton onPress={handleUserNavigate}>
					Start Messaging
				</GradientButton>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 2, alignItems: "center" },
	logoContainer: {
		marginTop: 10,
		marginBottom: 100,
		width: "80%",
		height: "60%",
		alignItems: "center",
		justifyContent: "center",
	},
	image: { width: "60%", height: "50%" },
	button: { width: "80%" },
	icon: { padding: 20, alignSelf: "flex-end" },
	dots: { flexDirection: "row", padding: 10, gap: 2 },
});
