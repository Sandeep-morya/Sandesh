import { router, useGlobalSearchParams } from "expo-router";
import React, { useState, useCallback } from "react";
import { View, Text, ScrollView, StyleSheet, TextInput } from "react-native";
import theme from "../src/globalStyle";
import Input from "../src/components/common/Input";
import Ionicons from "@expo/vector-icons/Ionicons";
import GradientButton from "../src/components/common/GradientButton";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import OTPAcceptor from "../src/components/auth/OTPAcceptor";
import { useDispatch } from "../src/utils/redux";
import { addToken } from "../src/toolkit/slices/userSlice";
import { addUserInfo } from "../src/toolkit/slices/userSlice";
const FIND_USER = gql`
	query FindUser($query: UserQuery) {
		findUser(query: $query) {
			_id
			name
			username
			email
			image
			mobile
			verified
			gender
			bio
			createdAt
			__typename
		}
	}
`;
const SEND_OTP = gql`
	mutation SendOTP($loginId: String!) {
		sendOTP(loginId: $loginId)
	}
`;
const PASSWORD_RESET = gql`
	mutation PasswordReset(
		$loginId: String!
		$password: String!
		$code: String!
	) {
		passwordReset(loginId: $loginId, password: $password, code: $code)
	}
`;
const PasswordReset = () => {
	const { email } = useGlobalSearchParams();
	const [loginId, setLoginId] = useState((email as string) || "");
	const [password, setPassword] = useState("");
	const [otp, setOtp] = useState("");
	const dispatch = useDispatch();

	const [findUser, { loading, error, data }] = useLazyQuery(FIND_USER);
	const [sendOTP] = useMutation(SEND_OTP);
	const [passwordReset, { loading: isLoading }] = useMutation(PASSWORD_RESET);

	const handleFindAccount = useCallback(async (email: string) => {
		email = email.trim();
		if (email !== "") {
			try {
				await findUser({ variables: { query: { email } } });
				await sendOTP({ variables: { loginId: email } });
			} catch (error) {
				alert(error?.message);
			}
		} else {
			alert("Enter email address to continue");
		}
	}, []);

	const handlePasswordRest = useCallback(
		async (email: string, password: string, otp: string) => {
			email = email.trim();
			otp = otp.trim();
			password = password.trim();
			if (otp !== "" && password !== "") {
				try {
					const res = await passwordReset({
						variables: { loginId: email, password, code: otp },
					});
					const token = res?.data?.passwordReset;
					const user = data?.findUser;
					alert("Password Updated Successfull");
					console.log(token, user);
					if (token && user) {
						dispatch(addToken(token));
						dispatch(addUserInfo(user));
						if (user.username !== "") {
							router.replace("/home");
						} else {
							router.replace({
								pathname: "/setup",
								params: { id: user._id, token },
							});
						}
					} else {
						throw new Error("Something went wrong");
					}
				} catch (error) {
					alert(error?.message);
				}
			} else {
				alert("Enter NewPasswod and OTP");
			}
		},
		[data],
	);

	return (
		<ScrollView
			style={styles.scrollView}
			contentContainerStyle={{ rowGap: 20 }}>
			<View style={styles.backIconWrapper}>
				<Ionicons
					name="arrow-back"
					color={theme.text.color}
					size={25}
					onPress={() => router.back()}
				/>
			</View>
			<View>
				<Text style={[theme.text, theme.headingMedium]}>
					Enter Your Email ID
				</Text>
				<Input
					placeholder="Email Address"
					value={loginId}
					onChangeText={setLoginId}
					icon="mail"
				/>
			</View>
			{!data && !data?.findUser && (
				<View>
					<GradientButton
						onPress={() => handleFindAccount(loginId)}
						isLoading={loading}
						variant="outline">
						Find My Account
					</GradientButton>
				</View>
			)}

			{data && data.findUser && (
				<View style={styles.resetContainer}>
					<View style={{ alignSelf: "flex-start" }}>
						<Text style={[theme.text, theme.headingMedium]}>
							Hi! {data.findUser.name}
						</Text>
						<Text style={[theme.text]}>We have found your account</Text>
					</View>
					<View style={styles.resetSlot}>
						<Text style={theme.dimmedText}>Enter New Password</Text>
						<Input
							placeholder="New Password"
							value={password}
							onChangeText={setPassword}
							icon="key"
							secure
						/>
					</View>

					<Text style={theme.dimmedText}>
						Enter OTP we have sent on your Email
					</Text>
					<View style={styles.otpWrapper}>
						<TextInput
							keyboardType="numeric"
							value={otp}
							maxLength={6}
							style={styles.otpTextInput}
							onChangeText={(e) => setOtp(e)}
						/>
						<OTPAcceptor otp={otp} />
					</View>
					<View style={styles.btnWrapper}>
						<GradientButton
							isLoading={isLoading}
							onPress={() => handlePasswordRest(loginId, password, otp)}>
							Reset Password
						</GradientButton>
					</View>
				</View>
			)}
		</ScrollView>
	);
};

export default PasswordReset;

const styles = StyleSheet.create({
	scrollView: {
		width: "100%",
		padding: 20,
		paddingBottom: 40,
		...theme.bg,
	},
	backIconWrapper: { alignSelf: "flex-start" },
	resetContainer: {
		marginTop: 30,
		gap: 20,
		alignItems: "center",
	},
	resetSlot: { gap: 10 },
	otpWrapper: {
		alignItems: "center",
		width: "75%",
		alignSelf: "center",
		position: "relative",
		height: 40,
	},
	otpTextInput: {
		width: "100%",
		height: "100%",
		position: "absolute",
		top: 0,
		left: 0,
		opacity: 0,
		zIndex: 10,
		fontSize: 20,
		letterSpacing: 35,
	},
	btnWrapper: {
		width: "100%",
		marginTop: 70,
	},
});
