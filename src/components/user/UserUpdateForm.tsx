import { View, Text, StyleSheet } from "react-native";
import { useState, useCallback } from "react";
import theme from "../../globalStyle";
import { IUser } from "../../../types";
import Input from "../common/Input";
import RadioButtonGroup from "../common/RadioButtonGroup";
import GradientButton from "../common/GradientButton";
import { gql, useMutation } from "@apollo/client";
import { router } from "expo-router";
import { useDispatch, useSelector } from "../../utils/redux";
import { updateUserInfo } from "../../toolkit/slices/userSlice";

interface IProps {
	token: string;
}

const UPDATE_USER = gql`
	mutation UpdateUserDetails($form: FormInput) {
		updateUserDetails(form: $form)
	}
`;
export default function UserUpdateForm({ token }: IProps) {
	const { info } = useSelector((store) => store.user);
	const [form, setForm] = useState({
		name: info.name,
		username: info.username,
		gender: info.gender,
		bio: info.bio,
	});
	const dispatch = useDispatch();

	const [updateUser, { loading }] = useMutation(UPDATE_USER);

	const handleSubmitForm = useCallback(async (formInput: typeof form) => {
		if (Object.values(formInput).every((e) => e.trim() !== "")) {
			try {
				const { data } = await updateUser({
					variables: { form: formInput },
					context: {
						headers: {
							authorization: `Bearer ${token}`,
						},
					},
				});
				console.log(data?.updateUserDetails);
				dispatch(updateUserInfo(formInput));
				router.push("/home");
			} catch (error) {
				alert(error?.message);
			}
		} else {
			alert("All fields are required");
		}
	}, []);

	return (
		<View style={styles.formWrapper}>
			<Input
				placeholder="Want to change name ?"
				value={form.name}
				onChangeText={(e) => setForm((x) => ({ ...x, name: e }))}
				icon={"user-check"}
			/>
			<Input
				placeholder="Choose a username"
				value={form.username}
				onChangeText={(e) => setForm((x) => ({ ...x, username: e }))}
				icon={"at-sign"}
			/>

			<Input
				placeholder="About Yourself"
				value={form.bio}
				onChangeText={(e) => setForm((x) => ({ ...x, bio: e }))}
				icon={"info"}
			/>

			<View style={styles.genderSelection}>
				<Text style={[theme.dimmedText, { fontSize: 15 }]}>
					Select Your Gender
				</Text>
				<RadioButtonGroup
					options={["Male", "Female", "Transgender"]}
					horizontal
					active={form.gender}
					setActive={(e) => setForm((x) => ({ ...x, gender: e }))}
				/>
			</View>
			<GradientButton
				isLoading={loading}
				onPress={() => handleSubmitForm(form)}>
				Submit Form
			</GradientButton>
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
		marginVertical: 20,
	},
});
