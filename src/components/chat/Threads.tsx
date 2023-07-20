import { View, Text } from "react-native";
import React from "react";
import { FlashList } from "@shopify/flash-list";
import Thread from "./Thread";
import Divider from "../common/Divider";

interface IProps {
	messages: any[];
}

export default function Threads(props: IProps) {
	return (
		<FlashList
			data={props.messages}
			renderItem={() => <Thread room={1} />}
			keyExtractor={(_, index) => index + "thread"}
			estimatedItemSize={30}
			contentContainerStyle={{ padding: 10 }}
			ItemSeparatorComponent={() => <Divider />}
		/>
	);
}
