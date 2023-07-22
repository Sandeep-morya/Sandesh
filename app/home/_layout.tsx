import { Tabs } from "expo-router";
import Header from "../../src/components/home/HeaderRight";
import HeaderRight from "../../src/components/home/HeaderRight";
import theme from "../../src/globalStyle";
import Logo from "../../src/components/common/Logo";
import TabBarIcon from "../../src/components/home/TabBarIcon";
import * as Notifications from "expo-notifications";
import SocketContextProvider from "../../src/provider/SocketProvider";
import ChatroomHeader from "../../src/components/chat/ChatRoomHeader";
Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: true,
	}),
});
export default () => (
	<SocketContextProvider>
		<Tabs
			screenOptions={{
				headerShadowVisible: false,
				headerStyle: { backgroundColor: theme.bg.backgroundColor },
				// headerTransparent: true,
				headerTitleStyle: { fontFamily: "open-sans-bold" },
				tabBarHideOnKeyboard: true,
				headerTintColor: theme.text.color,
				headerRight: (props) => <HeaderRight {...props} />,
				headerLeft: () => <Logo />,

				tabBarStyle: {
					height: 70,
					paddingTop: 10,

					// borderTopStartRadius: 10,
					// borderTopEndRadius: 10,
					borderColor: "#332449",
					backgroundColor: "#130429",
				},

				tabBarActiveTintColor: "white",
				tabBarInactiveTintColor: theme.dimmedText.color,
				tabBarShowLabel: false,
			}}>
			<Tabs.Screen
				name="index"
				options={{
					tabBarIcon: (props) => (
						<TabBarIcon name="chatbubble-ellipses-outline" {...props} />
					),
					headerTitle: "Sandesh",
					title: "Messages",
				}}
			/>
			<Tabs.Screen
				name="calls"
				options={{
					tabBarIcon: (props) => <TabBarIcon name="call-outline" {...props} />,
					title: "Calls",
				}}
			/>
			<Tabs.Screen
				name="people"
				options={{
					tabBarIcon: (props) => (
						<TabBarIcon name="people-outline" {...props} />
					),
					title: "People",
				}}
			/>
			<Tabs.Screen
				name="[chatroom]"
				options={{
					href: null,
					tabBarStyle: { display: "none" },
					headerShown: false,
				}}
			/>
		</Tabs>
	</SocketContextProvider>
);
