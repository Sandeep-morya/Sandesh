import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async <T>(key: string, value: T) => {
	try {
		const jsonValue = JSON.stringify(value);
		await AsyncStorage.setItem(key, jsonValue);
	} catch (e) {
		// saving error
	}
};

const getData = async (key: string) => {
	try {
		const jsonValue = await AsyncStorage.getItem(key);
		return jsonValue != null ? JSON.parse(jsonValue) : null;
	} catch (e) {
		// error reading value
	}
};

export { getData, storeData };
