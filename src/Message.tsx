import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import theme from "./globalStyle";
import { MessageType } from "../types";
import { useSelector } from "./utils/redux";
import useTimeAgo from "./hooks/useTimeAgo";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function Message(props: MessageType) {
	const { sender, recipient, content, createdAt, status } = props;
	const { info } = useSelector((store) => store.user);
	const time = useTimeAgo(createdAt);
	const [deliveryStatus, setDeliveryStatus] = useState(status);

	if (!info) {
		return <></>;
	}
	const styles = StyleSheet.create({
		messageContainer: {
			margin: 1,
			padding: 2,
			maxWidth: "70%",
			borderRadius: 10,
			alignSelf: sender === info._id ? "flex-end" : "flex-start",
			borderBottomRightRadius: 0,
			paddingVertical: 5,
			paddingHorizontal: 10,
			marginVertical: 5,
			backgroundColor: sender === info._id ? "white" : theme.primary.color,
			flexDirection: "row",
			gap: 10,
			flexWrap: "wrap",
		},

		messageText: {
			color: sender === info._id ? "black" : "white",
			fontFamily: "open-sans",
			fontSize: 14,
			textShadowColor: "rgba(0, 0, 0, 0.1)",
			textShadowOffset: { width: 1, height: 1 },
			textShadowRadius: 4,
			padding: 2,
		},
		time: {
			fontSize: 11,
			fontFamily: "open-sans-semi-bold",
			color: sender === info._id ? "rgba(0,0,0,0.4)" : theme.dimmedText.color,
		},
		icon: {
			color: "rgba(0,0,0,0.3)",
		},
		deliveryContainer: {
			alignSelf: "flex-end",
			flexDirection: "row",
			gap: 10,
		},
	});

	return (
		<View style={styles.messageContainer}>
			<Text style={styles.messageText}>{content}</Text>
			<View style={styles.deliveryContainer}>
				<Text style={styles.time}>{time}</Text>
				{sender === info._id && (
					<Ionicons
						name={
							deliveryStatus === "Pending"
								? "stopwatch-outline"
								: deliveryStatus === "Sent"
								? "checkmark"
								: "checkmark-done"
						}
						size={18}
						style={styles.icon}
					/>
				)}
			</View>
		</View>
	);
}
