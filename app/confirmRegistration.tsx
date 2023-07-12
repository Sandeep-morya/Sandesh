import { View, Text, Image, TextInput } from "react-native";

import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useSlice } from "../redux/utils";
import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import OTPAcceptor from "../components/OTPAcceptor";

export default function confirmRegistration() {
	const [otp, setOtp] = useState("");
	const [verified, setVerified] = useState(false);
	const { mode } = useSlice("appSettings");
	const router = useRouter();
	const { contryCode, phoneNumber, otp: OTP } = useLocalSearchParams();
	const bg = mode === "light" ? "bg-gray-200" : "bg-slate-800";
	const text = mode === "light" ? "text-black" : "text-white";

	useEffect(() => {
		if (otp === OTP) {
			setVerified(true);
		}
	}, [otp, OTP]);

	if (verified) {
		return (
			<Redirect
				href={{
					pathname: "/home",
					params: { phoneNumber },
				}}
			/>
		);
	}

	return (
		<SafeAreaView className={`flex-1 ${bg} p-4 gap-5`}>
			<View className="items-start">
				<Ionicons
					name="arrow-back"
					color={mode === "light" ? "black" : "white"}
					size={25}
					onPress={() => router.back()}
				/>
			</View>
			<View className="items-center mt-8">
				<Ionicons
					name="chatbox-ellipses-outline"
					size={100}
					color={mode === "light" ? "black" : "white"}
				/>
			</View>
			<View className="items-center">
				<Text className={`${text} text-xl font-bold mb-1`}>
					Check Your Messages
				</Text>
				<Text className={`text-gray-500`}>
					Please enter the code we have send to
				</Text>
				<Text className={`text-gray-500`}>
					{`+${contryCode} - ${phoneNumber}`}
				</Text>
			</View>

			<View className="items-center w-[65%] self-center relative">
				<TextInput
					keyboardType="numeric"
					value={otp}
					maxLength={6}
					className="bg-gray-200 h-[50] w-full tracking-[35] absolute top-0 opacity-1 z-10 opacity-0"
					onChangeText={(e) => setOtp(e)}
				/>
				<OTPAcceptor otp={otp} />
			</View>
			<View className="flex-1 items-center justify-end">
				<View className="flex-row gap-2 items-center">
					<Ionicons name="logo-google" size={24} color="#1da3dd" />
					<Text className="text-base text-[#1da3dd]">Sign in with Google</Text>
				</View>
			</View>
		</SafeAreaView>
	);
}
