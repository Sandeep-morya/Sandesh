import { View, Text, TextInput, StyleSheet } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { Redirect, router, useGlobalSearchParams } from "expo-router";
import { IUser } from "../types";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "../src/globalStyle";
import { Ionicons } from "@expo/vector-icons";
import OTPAcceptor from "../src/components/auth/OTPAcceptor";
import Button from "../src/components/common/Button";
import useTimer from "../src/hooks/useTimer";
import { validateSeconds } from "../src/utils/numberValidation";
import GradientButton from "../src/components/common/GradientButton";
import { gql, useMutation } from "@apollo/client";
import useThrottle from "../src/hooks/useThrottle";
import { useDispatch } from "../src/utils/redux";
import { addToken } from "../src/toolkit/slices/userSlice";

const SEND_OTP = gql`
	mutation SendOTP($loginId: String!) {
		sendOTP(loginId: $loginId)
	}
`;
const OTP_VERIFICATION = gql`
	mutation OptVerification($id: ID!, $loginId: String!, $code: String!) {
		optVerification(id: $id, loginId: $loginId, code: $code)
	}
`;

export default function Confirm() {
	const { id, name, loginId, verified } = useGlobalSearchParams();
	const throttle = useThrottle();
	const dispatch = useDispatch();

	const [sendOTP, { loading }] = useMutation(SEND_OTP);
	const [optVerification, { loading: isLoading }] =
		useMutation(OTP_VERIFICATION);

	const [otp, setOtp] = useState("");
	const { timer, timerReset, stopTimer, startTimer } = useTimer(59);

	if (verified) {
		return <Redirect href={"/home"} />;
	}

	const handleSendOTP = useCallback(async () => {
		console.log("otp-sent");
		try {
			const message = await sendOTP({ variables: { loginId } });
			console.log(message);
		} catch (error) {
			alert(error.message);
		}
	}, [loginId]);

	const handleSubmitOTP = useCallback(
		async (code: string) => {
			try {
				const { data } = await optVerification({
					variables: { id, loginId, code },
				});
				const token = data.optVerification;
				// :: Adding Token in Store ::
				dispatch(addToken(token));
				router.push({
					pathname: "/setup",
					params: { id, token },
				});
			} catch (error) {
				alert(error.message);
			}
		},
		[id, loginId],
	);

	useEffect(() => {
		handleSendOTP();
	}, [handleSendOTP]);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.backIconWrapper}>
				<Ionicons
					name="arrow-back"
					color={theme.text.color}
					size={25}
					onPress={() => router.back()}
				/>
			</View>

			<Ionicons
				name="ios-mail-open-outline"
				size={100}
				color={theme.text.color}
			/>

			<View style={styles.hintTextsWrapper}>
				<Text style={[theme.headingMedium, theme.text]}>Hi! {name}</Text>
				<Text style={[theme.headingMedium, theme.text]}>Check Your Email</Text>
				<Text style={[theme.dimmedText, { textAlign: "center" }]}>
					Enter the OTP we have sent to your email
				</Text>
				<Text style={theme.dimmedText}>{loginId}</Text>
			</View>

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
			<Text style={theme.text}> 0:{validateSeconds(timer)}</Text>
			{timer < 1 && (
				<Button
					onPress={() => {
						timerReset();
						throttle(handleSendOTP, 59000);
					}}>
					Resend OTP
				</Button>
			)}

			<View style={styles.submitButton}>
				<GradientButton
					isLoading={isLoading || loading}
					onPress={() => throttle(() => handleSubmitOTP(otp), 4000)}>
					Submit OTP
				</GradientButton>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		...theme.bg,
		flex: 1,
		padding: 20,
		gap: 30,
		alignItems: "center",
	},
	backIconWrapper: { alignSelf: "flex-start", marginBottom: 30 },
	hintTextsWrapper: { alignItems: "center" },
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
	submitButton: {
		width: "80%",
		flex: 1,
		justifyContent: "flex-end",
		marginBottom: 30,
	},
});
