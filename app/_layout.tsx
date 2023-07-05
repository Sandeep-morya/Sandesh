import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "../redux/store";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const disableHeader = { headerShown: false };

export default () => (
	<Provider store={store}>
		<Stack>
			<Stack.Screen name="index" options={disableHeader} />
			<Stack.Screen name="register" options={disableHeader} />
			<Stack.Screen name="confirmRegistration" options={disableHeader} />
		</Stack>
	</Provider>
);
