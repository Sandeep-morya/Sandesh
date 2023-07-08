import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useSlice } from "../redux/utils";

const StoryBubble = ({ x }: { x: number }) => {
	const { mode } = useSlice("appSettings");
	const bg = mode === "light" ? "bg-gray-200" : "bg-slate-800";
	const text = mode === "light" ? "text-black" : "text-white";
	return (
		<Pressable className="w-[60] h-[60] rounded-full relative items-center">
			<Image
				className="w-full h-full rounded-full "
				source={{ uri: `https://picsum.photos/50?random=${x}` }}
				alt=""
			/>
			<Text numberOfLines={2} className={`${text} text-center text-xs`}>
				Random Kumar
			</Text>
			{/* <View className="absolute bottom-0 right-2 w-[10] z-10 h-[10] bg-green-500 rounded-full shadow" /> */}
		</Pressable>
	);
};

export default StoryBubble;
