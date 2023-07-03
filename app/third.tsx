import { View, Text, Pressable } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";

const Touchable = styled(Pressable, "bg-blue-500 p-2");
const P = styled(Text, "text-white");
const Box = styled(View, "gap-2 items-center");

export default function Third() {
	const router = useRouter();
	return (
		<Box>
			<Touchable onPress={() => router.replace("/")}>
				<P>Go to Home</P>
			</Touchable>
			<Touchable onPress={() => router.push("/")}>
				<P>Go to Home as Next Screen</P>
			</Touchable>
			<Touchable onPress={() => router.back()}>
				<P>Go Back</P>
			</Touchable>
		</Box>
	);
}
