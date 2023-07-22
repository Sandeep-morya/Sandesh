import React, { useState, useCallback, useRef, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	Pressable,
	Button,
	StyleSheet,
	FlatList,
} from "react-native";
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import Chip from "../../src/Chip";
import Message from "../../src/Message";
import theme from "../../src/globalStyle";
import { MessageType } from "../../types";
import { useSelector } from "../../src/utils/redux";
import ChatroomHeader from "../../src/components/chat/ChatRoomHeader";
import useSocket from "../../src/hooks/useSocket";
import useDebounce from "../../src/hooks/useDebounce";
import useThrottle from "../../src/hooks/useThrottle";

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
	const params = useLocalSearchParams();
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState<MessageType[]>([]);
	const socket = useSocket();
	const debouncedMessage = useDebounce(message, 2000);

	const throttle = useThrottle();
	const [typing, setTyping] = useState(false);

	const flashListRef = useRef<any>(null);

	const addMessageInList = useCallback((message: MessageType) => {
		setMessages((e) => [...e, message]);
	}, []);

	const sendMessage = useCallback(
		(content: string) => {
			if (info && chatroom && socket) {
				const newMessage: MessageType = {
					content,
					recipient: chatroom as string,
					sender: info._id,
					createdAt: new Date(),
					status: "Pending",
				};
				addMessageInList(newMessage);
				socket.emit("client:send-message", newMessage);
				setMessage("");
			}
		},
		[info, chatroom, socket],
	);

	const sendTypingStatus = useCallback(
		(typing: boolean) => {
			if (socket && chatroom) {
				socket.emit("client:send-typing-status", typing, chatroom);
			}
		},
		[socket, chatroom],
	);

	useEffect(() => {
		if (message !== "") {
			throttle(() => sendTypingStatus(true), 2000);
		} else {
			sendTypingStatus(false);
		}
	}, [message]);

	useEffect(() => {
		if (socket) {
			socket.on("server:send-message", addMessageInList);
			socket.on("server:send-typing-status", (typing) => setTyping(typing));
		}
		return () => {
			if (socket) {
				socket.off("server:send-message", addMessageInList);
				socket.off("server:send-typing-status", () => setTyping(false));
			}
			console.log("cleanup");
		};
	}, [socket]);

	useEffect(() => {
		sendTypingStatus(false);
	}, [debouncedMessage]);

	return (
		<>
			<ChatroomHeader {...params} typing={typing} />
			<View style={styles.container}>
				{/* <View style={styles.header}>

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
					<FlatList
						ref={flashListRef}
						data={messages}
						keyboardShouldPersistTaps="never"
						renderItem={({ item }) => <Message {...item} />}
						// estimatedItemSize={50}
						onContentSizeChange={() => {
							if (flashListRef.current) {
								setTimeout(() => {
									flashListRef.current.scrollToEnd({ animated: true });
								}, 0);
							}
						}}
						// snapToAlignment="end"

						contentContainerStyle={styles.flashListContent}
					/>
				</View>

				{/*---:: Bottom Bar ::---*/}
				<View style={styles.bottomBar}>
					<View style={styles.inputContainer}>
						<MaterialIcons name="emoji-emotions" size={23} color="gray" />
						<TextInput
							style={styles.input}
							placeholder="Enter Message"
							placeholderTextColor={theme.dimmedText.color}
							value={message}
							onBlur={() => sendTypingStatus(false)}
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
						<MaterialIcons name="record-voice-over" size={24} color="white" />
					</Pressable>
				</View>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#332255",
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
		backgroundColor: "#13042999",
		borderRadius: 30,
	},
	input: {
		flex: 1,
		marginLeft: 8,
		fontSize: 14,
		fontFamily: "open-sans",
		color: "white",
	},
	iconsContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		paddingHorizontal: 5,
	},
	micButton: {
		backgroundColor: theme.secondary.color,
		padding: 10,
		borderRadius: 30,
		marginLeft: 10,
	},
	flashListContent: {
		flexGrow: 1, // Ensure the content fills the available space
		justifyContent: "flex-end", // Align items at the bottom
	},
});
