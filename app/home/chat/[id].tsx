import {
	View,
	Text,
	Pressable,
	TextInput,
	Button,
	Keyboard,
} from "react-native";
import { useCallback, useRef, useState } from "react";
import { useSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import Chip from "../../../components/Chip";
import { FlatList } from "react-native-gesture-handler";
import Message from "../../../components/Message";
import { FlashList } from "@shopify/flash-list";

const suggestions = [
	"Hi",
	"How are you",
	"Good Mornning",
	"Okk",
	"Thanks",
	"Good Night",
];
interface IMessage {
	id: number;
	content: string;
	user: string;
}
const allMessages: IMessage[] = [
	{ id: 0, content: "How are you ?", user: "sandeep" },
	{ id: 1, content: "I am fine.", user: "akash" },
	{ id: 2, content: "What about you ?", user: "sandeep" },
	{ id: 3, content: "I am also fine.", user: "akash" },
];

export default function Chat() {
	const { id } = useSearchParams();
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState(allMessages);
	const [active, setActive] = useState(false);
	const flashListRef = useRef<any>(null);

	const sendMessage = useCallback(
		(content: string) => {
			const newMessage = {
				id: Math.random(),
				content,
				user: active ? "sandeep" : "akash",
			};
			setMessages((e) => [...e, newMessage]);
			setMessage("");
		},
		[active],
	);

	return (
		<View className="flex-1">
			<View className="h-[60] bg-white flex-row items-center p-2">
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
					contentContainerStyle={{ columnGap: 10 }}
				/>
			</View>
			<View className="flex-1">
				<FlashList
					ref={flashListRef}
					data={messages as IMessage[]}
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
			<View className="h-[60] flex-row items-center p-2">
				<View className="flex-1 flex-row items-center p-2 bg-gray-200 rounded-full">
					<MaterialIcons name="emoji-emotions" size={23} color="gray" />
					<TextInput
						className="flex-1 mx-2 text-base"
						placeholder="Enter Message"
						value={message}
						onChangeText={(e) => setMessage(e)}
						blurOnSubmit={false}
						onSubmitEditing={() => sendMessage(message)}
					/>
					<View className="flex-row items-center gap-2 mr-2">
						<MaterialIcons name="attach-file" size={23} color="gray" />
						<MaterialIcons name="photo-camera" size={23} color="gray" />
					</View>
				</View>
				<Pressable className="bg-[#1da3dd] p-2 rounded-full ml-2">
					<MaterialIcons name="mic" size={24} color="white" />
				</Pressable>
			</View>
		</View>
	);
}
