import { Tabs } from "expo-router";
import Header from "../../src/components/home/HeaderRight";
import HeaderRight from "../../src/components/home/HeaderRight";
import theme from "../../src/globalStyle";
import Logo from "../../src/components/common/Logo";
import TabBarIcon from "../../src/components/home/TabBarIcon";
export default () => (
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
				height: 60,
				padding: 5,
				...theme.bg,
				shadowRadius: 0,
				borderColor: "#130429",
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
				tabBarIcon: (props) => <TabBarIcon name="people-outline" {...props} />,
				title: "People",
			}}
		/>
		<Tabs.Screen
			name="chat/[id]"
			options={{
				href: null,
			}}
		/>
		<Tabs.Screen
			name="stories"
			options={{
				href: null,
			}}
		/>
	</Tabs>
);
