import { Image } from "react-native";

export default function Logo() {
	return (
		<Image
			style={{ width: 30, height: 30, transform: [{ translateX: 10 }] }}
			source={require("../../../assets/icon.png")}
		/>
	);
}
