﻿import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "../src/toolkit/store";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useLayoutEffect } from "react";
import theme from "../src/globalStyle";

SplashScreen.preventAutoHideAsync();

export default () => {
	const [fontsLoaded] = useFonts({
		"open-sans": require("../assets/fonts/OpenSans-Regular.ttf"),
		"open-sans-italic": require("../assets/fonts/OpenSans-Italic.ttf"),
		"open-sans-light": require("../assets/fonts/OpenSans-Light.ttf"),
		"open-sans-medium": require("../assets/fonts/OpenSans-Medium.ttf"),
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
		<Provider store={store}>
			<Stack
				screenOptions={{
					statusBarColor: theme.bg.backgroundColor,
					statusBarStyle: "light",
				}}>
				<Stack.Screen name="index" options={{ headerShown: false }} />
				<Stack.Screen name="register" options={{ headerShown: false }} />
				<Stack.Screen name="password_reset" options={{ headerShown: false }} />
				<Stack.Screen name="confirm" options={{ headerShown: false }} />
				<Stack.Screen name="setup" options={{ headerShown: false }} />
			</Stack>
		</Provider>
	);
};
