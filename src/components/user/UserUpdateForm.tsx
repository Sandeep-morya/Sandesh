import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import theme from "../../globalStyle";
import { IUser } from "../../../types";
import Input from "../common/Input";
import RadioButtonGroup from "../common/RadioButtonGroup";

export default function UserUpdateForm(props: IUser) {
	const [user, setUser] = useState(props);

	return (
		<View style={styles.formWrapper}>
			<Input
				placeholder="Want to change name ?"
				value={user.name}
				onChangeText={(e) => setUser((x) => ({ ...x, name: e }))}
				icon={"user-check"}
			/>
			<Input
				placeholder="Choose a username"
				value={user.username}
				onChangeText={(e) => setUser((x) => ({ ...x, username: e }))}
				icon={"at-sign"}
			/>

			<Input
				placeholder="About Yourself"
				value={user.bio}
				onChangeText={(e) => setUser((x) => ({ ...x, bio: e }))}
				icon={"info"}
			/>

			<View style={styles.genderSelection}>
				<Text style={[theme.dimmedText]}>Select You Gender</Text>
				<RadioButtonGroup
					options={["Male", "Female", "Transgender"]}
					horizontal
					active={user.gender}
					setActive={(e) => setUser((x) => ({ ...x, gender: e }))}
				/>
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	formWrapper: {
		flex: 1,
		width: "100%",
		// borderRadius: 5,
		// borderColor: theme.dimmedText.color,
		// borderWidth: 2,
		padding: 10,
		gap: 10,
	},
	genderSelection: {
		width: "100%",
		gap: 10,
		marginTop: 20,
	},
});
