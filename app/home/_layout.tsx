import { Tabs, Slot } from "expo-router";
const disableHeader = { headerShown: false };
import HeaderRight from "../../components/HeaderRight";
import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";
import { useSlice } from "../../redux/utils";

const HomeLayout = () => {
	const { mode } = useSlice("appSettings");
	return (
		<Tabs
			screenOptions={{
				headerRight: (props) => <HeaderRight {...props} />,
				headerStyle: {
					backgroundColor: mode === "dark" ? "#000000" : "#1da3dd",
					shadowColor: "black",
				},

				headerTintColor: "white",

				tabBarLabelStyle: {
					fontSize: 12,
					marginBottom: 5,
				},

				tabBarStyle: {
					height: 60,
					padding: 5,
					backgroundColor: mode === "dark" ? "#000000" : "#1da3dd",
					shadowColor: "black",
				},
				tabBarActiveTintColor: mode === "dark" ? "#1da3dd" : "white",
				tabBarInactiveTintColor: "rgba(255,255,255,0.4)",
			}}>
			<Tabs.Screen
				name="index"
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="chatbox-ellipses-outline" {...{ color, size }} />
					),
					headerTitle: "Sandesh",
					title: "Messages",
				}}
			/>
			<Tabs.Screen
				name="calls"
				options={{
					tabBarIcon: ({ color, size }) => (
						<Feather name="phone-call" {...{ color, size }} />
					),
					title: "Calls",
				}}
			/>
			<Tabs.Screen
				name="contacts"
				options={{
					tabBarIcon: ({ color, size }) => (
						<AntDesign name="contacts" {...{ color, size }} />
					),
					title: "Contacts",
				}}
			/>
		</Tabs>
	);
};
export default HomeLayout;
