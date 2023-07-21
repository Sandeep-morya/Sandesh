import React, { useState, useCallback, useRef } from "react";
import {
	View,
	Text,
	TextInput,
	Pressable,
	Button,
	StyleSheet,
} from "react-native";
import { useGlobalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { FlashList } from "@shopify/flash-list";
import Chip from "../../src/Chip";
import Message from "../../src/Message";
import theme from "../../src/globalStyle";
import { MessageType } from "../../types";
import { useSelector } from "../../src/utils/redux";

const suggestions = [
	"Hi",
	"How are you",
	"Good Morning",
	"Okk",
	"Thanks",
	"Good Night",
];

export default function ChatRoom() {
	const { info } = useSelector((store) => store.user);
	const { chatroom } = useGlobalSearchParams();
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState<MessageType[]>([]);
	const [active, setActive] = useState(false);
	const flashListRef = useRef<any>(null);

	const sendMessage = useCallback(
		(content: string) => {
			if (info && chatroom) {
			}
			const newMessage: MessageType = {
				sender: info._id,
				recipient: chatroom as string,
				content,
				createdAt: Date.now().toString(),
			};
			setMessages((prevMessages) => [...prevMessages, newMessage]);
			setMessage("");
		},
		[info, chatroom],
	);

	return (
		<View style={styles.container}>
			{/* <View style={styles.header}>
				<Button
					color={active ? "teal" : "gray"}
					title="Akash"
					onPress={() => setActive(false)}
				/>
				<Button
					color={active ? "gray" : "teal"}
					title="Sandeep"
					onPress={() => setActive(true)}
				/>
				<FlatList
					data={suggestions}
					renderItem={({ item }) => <Chip title={item} />}
					keyExtractor={(_, index) => index + "suggestions"}
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ paddingHorizontal: 10 }}
				/>
			</View> */}
			<View style={{ flex: 1 }}>
				<FlashList
					ref={flashListRef}
					data={messages}
					keyboardShouldPersistTaps="never"
					renderItem={({ item }) => <Message {...item} />}
					estimatedItemSize={50}
					onContentSizeChange={() => {
						if (flashListRef.current) {
							setTimeout(() => {
								flashListRef.current.scrollToEnd({ animated: true });
							}, 0);
						}
					}}
				/>
			</View>

			{/*---:: Bottom Bar ::---*/}
			<View style={styles.bottomBar}>
				<View style={styles.inputContainer}>
					<MaterialIcons name="emoji-emotions" size={23} color="gray" />
					<TextInput
						style={styles.input}
						placeholder="Enter Message"
						value={message}
						onChangeText={(text) => setMessage(text)}
						blurOnSubmit={false}
						onSubmitEditing={() => sendMessage(message)}
					/>
					<View style={styles.iconsContainer}>
						<MaterialIcons name="attach-file" size={23} color="gray" />
						<MaterialIcons name="photo-camera" size={23} color="gray" />
					</View>
				</View>
				<Pressable style={styles.micButton}>
					<MaterialIcons name="mic" size={24} color="white" />
				</Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		...theme.bg,
		padding: 10,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
		height: 60,
	},
	bottomBar: {
		flexDirection: "row",
		alignItems: "center",

		height: 60,
	},
	inputContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
		backgroundColor: "#e2e2e2",
		borderRadius: 30,
	},
	input: {
		flex: 1,
		marginLeft: 8,
		fontSize: 15,
		fontFamily: "open-sans",
	},
	iconsContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		paddingHorizontal: 5,
	},
	micButton: {
		backgroundColor: theme.primary.color,
		padding: 10,
		borderRadius: 30,
		marginLeft: 10,
	},
});
