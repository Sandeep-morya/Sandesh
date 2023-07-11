import { View, Text, Pressable, TextInput } from "react-native";
import { useState } from "react";
import { useSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import Chip from "../../../components/Chip";
import { FlatList } from "react-native-gesture-handler";

const suggestions = [
	"Hi",
	"How are you",
	"Good Mornning",
	"Okk",
	"Thanks",
	"Good Night",
];

export default function Chat() {
	const { id } = useSearchParams();
	const [message, setMessage] = useState("");
	return (
		<View className="flex-1">
			<View className="h-[60] bg-white flex-row items-center p-2">
				<FlatList
					data={suggestions}
					renderItem={({ item }) => <Chip title={item} />}
					keyExtractor={(_, index) => index + "suggestions"}
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ columnGap: 10 }}
				/>
			</View>
			<View className="flex-1"></View>

			{/*---:: Bottom Bar ::---*/}
			<View className="h-[60] flex-row items-center p-2">
				<View className="flex-1 flex-row items-center p-2 bg-gray-200 rounded-full">
					<MaterialIcons name="emoji-emotions" size={23} color="gray" />
					<TextInput
						className="flex-1 mx-2 text-base"
						placeholder="Enter Message"
						value={message}
						onChangeText={(e) => setMessage(e)}
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
