import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "../src/toolkit/store";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useLayoutEffect } from "react";
import theme from "../src/globalStyle";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { usePathname } from "expo-router";

SplashScreen.preventAutoHideAsync();

const client = new ApolloClient({
	uri: "http://192.168.1.4:4000/graphql",
	cache: new InMemoryCache(),
});

export default () => {
	const pathname = usePathname();
	const [fontsLoaded] = useFonts({
		"open-sans": require("../assets/fonts/OpenSans-Regular.ttf"),
		"open-sans-italic": require("../assets/fonts/OpenSans-Italic.ttf"),
		"open-sans-light": require("../assets/fonts/OpenSans-Light.ttf"),
		"open-sans-semi-bold": require("../assets/fonts/OpenSans-SemiBold.ttf"),
		"open-sans-bold": require("../assets/fonts/OpenSans-Bold.ttf"),
	});

	useLayoutEffect(() => {
		(async () => {
			if (fontsLoaded) {
				await SplashScreen.hideAsync();
			}
		})();
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<ApolloProvider client={client}>
			<Provider store={store}>
				<Stack
					screenOptions={{
						statusBarColor: pathname.includes("chatroom")
							? "red"
							: theme.bg.backgroundColor,
						statusBarStyle: "light",
					}}>
					<Stack.Screen name="index" options={{ headerShown: false }} />
					<Stack.Screen name="register" options={{ headerShown: false }} />
					<Stack.Screen
						name="password_reset"
						options={{ headerShown: false }}
					/>
					<Stack.Screen name="confirm" options={{ headerShown: false }} />
					<Stack.Screen name="setup" options={{ headerShown: false }} />
					<Stack.Screen name="home" options={{ headerShown: false }} />
				</Stack>
			</Provider>
		</ApolloProvider>
	);
};
