import { Stack } from "expo-router";
export default function () {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen name="second" options={{ headerTitle: "Second Screen" }} />
			<Stack.Screen name="third" options={{ headerTitle: "Third Screen" }} />
		</Stack>
	);
}
