import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "../redux/store";

const disableHeader = { headerShown: false };

const AppLayout = () => (
	<Provider store={store}>
		<Stack>
			<Stack.Screen name="index" options={disableHeader} />
			<Stack.Screen name="register" options={disableHeader} />
			<Stack.Screen name="confirmRegistration" options={disableHeader} />
			<Stack.Screen name="home" options={disableHeader} />
		</Stack>
	</Provider>
);

export default AppLayout;
