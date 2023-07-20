import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useEffect, useLayoutEffect, useCallback } from "react";
import { router, useGlobalSearchParams } from "expo-router";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "../src/utils/redux";
import { addUserInfo } from "../src/toolkit/slices/userSlice";
import theme from "../src/globalStyle";
import UpdateProfilePicture from "../src/components/user/UpdateProfilePicture";

import Input from "../src/components/common/Input";
import UserUpdateForm from "../src/components/user/UserUpdateForm";
import { ScrollView } from "react-native-gesture-handler";

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

export default function Setup() {
	const { id, token } = useGlobalSearchParams();
	const dispatch = useDispatch();
	const { info } = useSelector((store) => store.user);

	const { loading, error, data } = useQuery(FIND_USER, {
		variables: { query: { _id: id } },
	});

	useEffect(() => {
		if (data && data.findUser) {
			dispatch(addUserInfo(data.findUser));
		}
	}, [data]);

	console.log({ info });

	useLayoutEffect(() => {
		if (info && info.username !== "") {
			router.replace("/home");
		}
	}, [info]);
	const handleSubmitForm = useCallback(() => {}, []);

	if (loading || !info) {
		return (
			<View style={styles.container}>
				<ActivityIndicator size={"large"} color="red" />
			</View>
		);
	}
	if (error) {
		return <Text>{error.message}</Text>;
	}

	return (
		<ScrollView style={theme.bg}>
			<View style={styles.container}>
				<UpdateProfilePicture token={token as string} />
				<View style={{ alignItems: "center" }}>
					<Text style={[theme.headingLarge, theme.text]}>
						Hey! {info?.name}
					</Text>
					<Text style={[theme.text]}>Please fill this form to continue</Text>
				</View>
				<UserUpdateForm token={token as string} />
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		...theme.bg,
		padding: 20,
		gap: 20,
	},
});
