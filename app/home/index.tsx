import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { useSelector } from "../../src/utils/redux";
import theme from "../../src/globalStyle";
import GradientInput from "../../src/components/common/GradientInput";
import Thread from "../../src/components/chat/Thread";
import Threads from "../../src/components/chat/Threads";
import GradientButton from "../../src/components/common/GradientButton";
import Button from "../../src/components/common/Button";
import EmptyMessageComponent from "../../src/components/chat/EmptyMessageComponent";

const messages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export default function Messages() {
	const { info } = useSelector((store) => store.user);

	// console.log(info?.verified, info?.username);
	const [searchText, setSearchText] = useState("");
	return (
		<ScrollView style={theme.bg} contentContainerStyle={{ padding: 10 }}>
			{true && (
				<View style={styles.searchContainer}>
					<GradientInput
						value={searchText}
						onChangeText={setSearchText}
						placeholder="Search"
					/>
				</View>
			)}
			{false && <EmptyMessageComponent />}
			{true && (
				<View style={styles.threadsContainer}>
					{messages.map((e) => (
						<Thread key={e} room={e} />
					))}
				</View>
			)}
		</ScrollView>
		// <View style={styles.container}>
		// 	<View style={styles.searchContainer}>
		// 		<GradientInput
		// 			value={searchText}
		// 			onChangeText={setSearchText}
		// 			placeholder="Search"
		// 		/>
		// 	</View>
		// 	<Threads messages={messages} />
		// </View>
	);
}

const styles = StyleSheet.create({
	threadsContainer: {
		gap: 20,
		padding: 10,
	},
	container: {
		// ...theme.bg,
		flex: 1,
		paddingHorizontal: 10,
	},

	searchContainer: {
		width: "95%",
		alignSelf: "center",
		marginBottom: 10,
	},
});
