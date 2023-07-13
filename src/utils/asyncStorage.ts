import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async <T>(key: string, value: T) => {
	try {
		const jsonvalue = JSON.stringify(value);
		await AsyncStorage.setItem(key, jsonvalue);
	} catch (error) {
		alert("Something went wrong");
	}
};

const getData = async (key: string) => {
	try {
		const jsonvalue = await AsyncStorage.getItem(key);
		return jsonvalue ? JSON.parse(jsonvalue) : null;
	} catch (error) {
		alert("Something went wrong");
	}
};

export { storeData, getData };
