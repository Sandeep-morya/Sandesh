import { View, Text, Button } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context"; 
import { Link } from "expo-router";

export default function Second() {
	return (
		<View>
			<Text>Second</Text>
			<Link href={"/"} asChild>
				<Button title="Go To Home" />
			</Link>
			<Link href={"/third"} asChild>
				<Button title="Go To Third Screen" />
			</Link>
		</View>
	);
}
