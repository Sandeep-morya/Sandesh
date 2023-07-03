import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { styled } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import Button from "../components/Button";

const Container = styled(View, "flex-1 justify-center items-center p-3 gap-3");
const Heading = styled(Text, "font-bold text-xl capitalize");

export default function Home() {
	return (
		<SafeAreaView className="flex-1">
			<Container>
				<Heading>hello</Heading>

				<Link href={"second"} className="mb-4 border">
					Go to second Screen
				</Link>

				<Link href={"third"} asChild>
					<Button>Go to Third Screen</Button>
				</Link>

				<StatusBar style="auto" />
			</Container>
		</SafeAreaView>
	);
}
