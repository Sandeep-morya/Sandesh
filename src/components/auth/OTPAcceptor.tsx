import { View, Text, TextInput, StyleSheet } from "react-native";
import { Dispatch, SetStateAction, FC } from "react";
import { useState } from "react";
import { router } from "expo-router";
import OTPBox from "./OTPBox";

export default function OTPAcceptor({ otp }: { otp: string }) {
	return (
		<View style={styles.hstack}>
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

const styles = StyleSheet.create({
	hstack: {
		flexDirection: "row",
		gap: 10,
	},
});
