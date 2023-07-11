import { View, Text, Image } from "react-native";
import React, { useLayoutEffect } from "react";
import { useDispatch, useSlice } from "../redux/utils";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchAppSettings, toggleColorMode } from "../redux/appSettings";
import { StatusBar } from "expo-status-bar";
import { logo } from "../assets";
import Button from "../components/Button";

import { Redirect, useRouter } from "expo-router";

interface IDot {
	active?: boolean;
}

const Dot = ({ active }: IDot) => {
	const { mode } = useSlice("appSettings");
	const color = active ? "#1da3dd" : mode === "dark" ? "white" : "black";
	return (
		<Entypo name="dot-single" style={{ margin: -6 }} size={24} color={color} />
	);
};

export default function index() {
	const { mode } = useSlice("appSettings");
	const dispatch = useDispatch();
	const router = useRouter();

	const bg = mode === "light" ? "bg-gray-200" : "bg-slate-800";
	const text = mode === "light" ? "text-black" : "text-white";

	useLayoutEffect(() => {
		dispatch(fetchAppSettings());
	}, []);

	return <Redirect href={"/home"} />;

	return (
		<>
			<SafeAreaView className={`flex-1 ${bg} transition-all duration-700;`}>
				<View className="flex-1">
					<View className="self-end p-4">
						<Ionicons
							name={mode === "dark" ? "moon" : "sunny"}
							size={24}
							color="#1da3dd"
							onPress={() => dispatch(toggleColorMode())}
						/>
					</View>
					<View className="w-full h-[500]  justify-start pt-16 items-center">
						<Image className="w-[150] h-[150]" source={logo} alt="logo" />
						<Text className={`${text} text-2xl font-bold mt-4 mb-1`}>
							Sandesh
						</Text>
						<Text className={`text-gray-500`}>
							The world's fastest messaging app.
						</Text>
						<Text className={`text-gray-500`}>It is free and secure.</Text>
						<View className="flex-row mt-4">
							<Dot active />
							<Dot />
							<Dot />
							<Dot />
							<Dot />
							<Dot />
						</View>
					</View>
				</View>

				<View className="justify-self-end my-16 px-8">
					<Button onPress={() => router.push("/register")}>
						Start Messaging
					</Button>
				</View>
			</SafeAreaView>
			<StatusBar style={mode === "dark" ? "light" : "dark"} />
		</>
	);
}
