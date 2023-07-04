﻿import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "../redux/store";

export default () => (
	<Provider store={store}>
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					headerShown: false,
				}}
			/>
		</Stack>
	</Provider>
);
