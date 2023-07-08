import { View, Text, TextInput } from "react-native";
import { Dispatch, SetStateAction, FC } from "react";
import { useState } from "react";
import { useSlice } from "../redux/utils";
import { useRouter } from "expo-router";

interface IProps {
	otp: string;
}
interface IOTPBoxProps {
	filled: boolean;
	value: string;
	active: boolean;
}

const OTPBox: FC<IOTPBoxProps> = ({ active, filled, value }) => {
	const borderColor = active || filled ? "border-[#1da3dd]" : "border-gray-500";
	return (
		<View
			className={`w-[33] h-[40] rounded-md border-2 ${borderColor} items-center justify-center m-1`}>
			<Text className="text-[#1da3dd] text-lg font-semibold">{value}</Text>
		</View>
	);
};

export default function OTPAcceptor({ otp }: IProps) {
	const { mode } = useSlice("appSettings");
	const router = useRouter();
	const text = mode === "light" ? "text-black" : "text-white";
	return (
		<View className="flex-row flex">
			{[1, 2, 3, 4, 5, 6].map((_, index) => (
				<OTPBox
					key={index + "otp-box"}
					value={otp[index]}
					active={otp.length === index}
					filled={otp.length > index}
				/>
			))}
		</View>
	);
}
