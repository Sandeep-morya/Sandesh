import { Tabs } from "expo-router";

export default () => (
	<Tabs>
		<Tabs.Screen name="index" options={{ title: "Messages" }} />
		<Tabs.Screen name="calls" options={{ title: "Calls" }} />
		<Tabs.Screen name="people" options={{ title: "People" }} />
	</Tabs>
);
