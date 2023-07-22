import { View, Text, StyleSheet, Pressable, Animated } from "react-native";
import { useState, Dispatch, SetStateAction, useEffect } from "react";
import theme from "../../globalStyle";

interface IProps {
	tabIndex: number;
	setTabIndex: Dispatch<SetStateAction<number>>;
	tabs: string[];
}

export default function Tabs({ tabIndex, setTabIndex, tabs }: IProps) {
	const [sliderPosition] = useState(new Animated.Value(0));
	useEffect(() => {
		Animated.timing(sliderPosition, {
			toValue: tabIndex === 0 ? 0 : 1,
			duration: 500,
			useNativeDriver: true,
		}).start();
	}, [tabIndex]);

	const styles = StyleSheet.create({
		tabs: {
			width: "80%",
			height: 50,
			marginVertical: "auto",
			flexDirection: "row",
			backgroundColor: "#325",
			position: "relative",
			borderRadius: 100,
			overflow: "hidden",
		},
		tab: {
			flex: 1,

			justifyContent: "center",
			alignItems: "center",
		},
		tabTitle: {
			// ...theme.text,
			fontFamily: "open-sans-semi-bold",
			textShadowColor: "rgba(0, 0, 0, 0.5)",
			textShadowOffset: { width: 1, height: 1 },
			textShadowRadius: 4,
		},
		slider: {
			width: "50%",
			height: "100%",
			position: "absolute",
			top: 0,
			transform: [
				{
					translateX: sliderPosition.interpolate({
						inputRange: [0, 1],
						outputRange: [0, 150], // Replace "50%" with the desired pixel value, e.g., 150
					}),
				},
			],
			backgroundColor: theme.primary.color,
		},
	});
	return (
		<View style={styles.tabs}>
			<Animated.View style={[styles.slider]} />
			{tabs.map((tab, index) => (
				<Pressable
					key={tab + index}
					onPress={() => setTabIndex(index)}
					style={styles.tab}>
					{({ pressed }) => (
						<Text
							style={[
								styles.tabTitle,
								{
									color: pressed
										? theme.primary.color
										: tabIndex === index
										? "white"
										: theme.dimmedText.color,
								},
							]}>
							{tab}
						</Text>
					)}
				</Pressable>
			))}
		</View>
	);
}
