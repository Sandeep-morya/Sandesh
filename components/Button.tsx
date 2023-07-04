import { Pressable, Text } from "react-native";
import { useState, PropsWithChildren } from "react";
import { styled } from "nativewind";

interface Props extends PropsWithChildren {
	onPress?: () => void;
}

const S = {
	Pressable: styled(
		Pressable,
		"bg-[#1da3dd] px-3 py-3 rounded active:bg-[#0c92cc] items-center",
	),
	Text: styled(Text, "text-base  font-semibold text-white"),
};

export default function Button(props: Props) {
	return (
		<S.Pressable android_ripple={{ color: "#0c92cc" }} onPress={props.onPress}>
			<S.Text>{props.children}</S.Text>
		</S.Pressable>
	);
}
