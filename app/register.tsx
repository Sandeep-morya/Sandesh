import { View, Text, Image, TextInput, Pressable } from "react-native";
import { useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSlice } from "../redux/utils";
import { useRouter } from "expo-router";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { countries } from "../data";

// function getFlagEmoji(countryCode: string) {
// 	return countryCode
// 		.replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
// }
export default function register() {
	const { mode } = useSlice("appSettings");
	const router = useRouter();
	const [contryCode, setContryCode] = useState("+");
	const [phoneNumber, setPhoneNumber] = useState("");

	const bg = mode === "light" ? "bg-gray-200" : "bg-slate-800";
	const text = mode === "light" ? "text-black" : "text-white";
	const iconColor =
		mode === "light" ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.3)";

	const handleContryCode = useCallback(
		(e: string) => {
			if (e.length > 0) {
				setContryCode(e);
			}
		},
		[setContryCode],
	);
	return (
		<SafeAreaView
			className={`flex-1 ${bg} justify-center px-8 pt-8 py-0 gap-8`}>
			<View className="items-center">
				<Text className={`${text} text-xl font-bold mt-4 mb-1`}>
					Your phone number
				</Text>
				<Text className={`text-gray-500`}>Please confirm you country code</Text>
				<Text className={`text-gray-500`}>and enter your phone number.</Text>
			</View>

			<View className="border border-gray-500 p-3 rounded-md flex-row justify-between items-center">
				{countries[contryCode] ? (
					<View className="flex-row items-center gap-6">
						<Image
							className="w-[32] h-[20]"
							source={{
								uri: `https://flagsapi.com/${countries[contryCode].code}/flat/32.png`,
							}}
							alt="Country"
						/>
						<Text className={`text-gray-500 text-base`}>
							{countries[contryCode].name}
						</Text>
					</View>
				) : (
					<Text className={`text-gray-500 text-base`}>Country</Text>
					// <Text className="text-xl"> {getFlagEmoji("PK")}</Text>
				)}

				<FontAwesome name="angle-right" size={24} color={iconColor} />
			</View>

			<View className="border border-gray-500 p-3 rounded-md flex-row items-center">
				<TextInput
					className={`${text} w-[50] text-base mx-1`}
					keyboardType="numeric"
					placeholder="+"
					placeholderTextColor={iconColor}
					maxLength={6}
					value={contryCode}
					onChangeText={(e) => handleContryCode(e)}
				/>

				<TextInput
					className={`${text} flex-1 text-base border-l border-l-gray-500  px-4 `}
					keyboardType="numeric"
					placeholder="Phone Number"
					placeholderTextColor={iconColor}
					maxLength={10}
					value={phoneNumber}
					onChangeText={(e) => setPhoneNumber(e)}
				/>
			</View>

			<View className="items-end pt-10">
				<Pressable
					onPress={() =>
						router.push({
							pathname: "/confirmRegistration",
							params: { contryCode, phoneNumber, otp: "123456" },
						})
					}
					className="bg-[#1da3dd] rounded-full p-4">
					<Ionicons name="arrow-forward" size={25} color="white" />
				</Pressable>
			</View>
		</SafeAreaView>
	);
}
