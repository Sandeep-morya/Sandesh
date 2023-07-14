import { View, Text, Image, StyleSheet } from "react-native";
import { useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "../src/globalStyle";
import Input from "../src/components/common/Input";
import GradientButton from "../src/components/common/GradientButton";
import Button from "../src/components/common/Button";
import { router } from "expo-router";
import { IRegistranstionForm, IUser } from "../types";
import { useQuery, gql, useMutation } from "@apollo/client";

const CREATE_NEW_ACCOUNT = gql`
	mutation NewAccount($name: String!, $email: String!, $password: String!) {
		createAccount(name: $name, email: $email, password: $password) {
			_id
			name
			email
			verified
			username
			mobile
			bio
			createdAt
		}
	}
`;
type FormType = "login" | "register";

export default function Register() {
	const [form, setForm] = useState<FormType>("login");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [createAccount, { loading }] = useMutation(CREATE_NEW_ACCOUNT);

	const handleAuthentication = useCallback(
		async (formData: IRegistranstionForm) => {
			if (Object.values(formData).every((e) => e != "")) {
				try {
					const { data } = await createAccount({ variables: formData });
					const user: IUser = data.createAccount;
					router.push({
						pathname: form === "register" ? "/confirm" : "/home",
						params: {
							id: user._id,
							name: user.name,
							loginId: user.email,
							verfied: user.verified,
						},
					});
				} catch (error) {
					alert(error?.message);
				}
			} else {
				alert("Fill all the details to continue");
			}
		},
		[form],
	);

	return (
		<SafeAreaView style={[styles.container, theme.bg]}>
			<Text style={styles.language}>{"English(UK)"}</Text>
			<Image
				style={styles.image}
				source={require("../assets/adaptive-icon.png")}
				alt="logo"
			/>
			<View style={styles.form}>
				{form === "register" && (
					<Input
						placeholder="Your Name"
						value={name}
						onChangeText={setName}
						icon="user"
					/>
				)}
				<Input
					placeholder="Email Address"
					value={email}
					onChangeText={setEmail}
					icon="mail"
				/>
				<Input
					placeholder="Password"
					value={password}
					onChangeText={setPassword}
					icon="key"
					secure
				/>
				<GradientButton
					variant="outline"
					isLoading={loading}
					onPress={() => handleAuthentication({ name, email, password })}>
					{form === "login" ? "Sign In" : "Register"}
				</GradientButton>

				{form === "login" && (
					<Button
						onPress={() =>
							router.push({ pathname: "password_reset", params: { email } })
						}>
						Forgotten Password ?
					</Button>
				)}
			</View>
			<View style={styles.registerButtonWrapper}>
				<GradientButton
					onPress={() => setForm(form === "login" ? "register" : "login")}>
					{form === "login"
						? "Create a new Account"
						: "Already have an account ?"}
				</GradientButton>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 2,
		alignItems: "center",
	},
	language: {
		...theme.text,
		padding: 30,
	},
	image: {
		width: 100,
		height: 100,
		marginVertical: 30,
	},
	form: {
		width: "80%",
		gap: 10,
	},
	registerButtonWrapper: {
		width: "80%",
		flex: 1,
		justifyContent: "flex-end",
		marginBottom: 50,
	},
});
