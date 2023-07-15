import { View, Text } from "react-native";
import React from "react";
import { useGlobalSearchParams } from "expo-router";
import { gql, useQuery } from "@apollo/client";

const FIND_USER = gql`
	query FindUser($query: UserQuery) {
		findUser(query: $query) {
			name
			email
			username
			_id
		}
	}
`;

export default function Setup() {
	const { id, token } = useGlobalSearchParams();
	console.log({ id, token });
	const { loading, error, data } = useQuery(FIND_USER, {
		variables: { query: { _id: id } },
	});

	console.log(data?.findUser);

	return (
		<View>
			<Text>User Name: {data?.findUser?.name}</Text>
			<Text>Email: {data?.findUser?.email}</Text>
			<Text>Username: {data?.findUser?.username}</Text>
			<Text>ID: {data?.findUser?._id}</Text>
		</View>
	);
}
