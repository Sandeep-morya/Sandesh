import { StyleSheet } from "react-native";

const theme = StyleSheet.create({
	bg: { backgroundColor: "#130429" },
	text: { color: "#ffffffbb", fontFamily: "open-sans", letterSpacing: 0.5 },
	gold: { color: "#f4bf00" },
	primary: { color: "#FF269E" },
	secondary: { color: "#23CDEE" },
	headingLarge: {
		fontSize: 40,
		fontFamily: "open-sans-bold",
		letterSpacing: 1,
	},
	dimmedText: {
		color: "rgba(255,255,255,0.5)",
		letterSpacing: 1,
		fontFamily: "open-sans",
	},
	textShadow: {
		textShadowColor: "rgba(0, 0, 0, 0.7)",
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 10,
	},
});

export default theme;
