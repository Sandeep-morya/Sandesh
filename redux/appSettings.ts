import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IAppSettigs, Language, Theme } from "../types";
import { getData, storeData } from "../utlis/asyncStorage";

let initialState: IAppSettigs = {
	mode: "light",
	theme: "default",
	language: "en",
};

export const fetchAppSettings = createAsyncThunk(
	"appSettings/fetchAppSettings",
	async () => {
		const data = await getData("sandesh-app-settings");
		return data || initialState;
	},
);

const AppSettingSlice = createSlice({
	name: "app-settings",
	initialState,
	reducers: {
		toggleColorMode(state) {
			state.mode = state.mode === "dark" ? "light" : "dark";
			storeData("sandesh-app-settings", state);
		},
		changeTheme(state, action: PayloadAction<Theme>) {
			state.theme = action.payload;
			storeData("sandesh-app-settings", state);
		},
		changeLanguage(state, action: PayloadAction<Language>) {
			state.language = action.payload;
			storeData("sandesh-app-settings", state);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchAppSettings.fulfilled, (state, action) => {
			return action.payload;
		});
	},
});

export const { toggleColorMode, changeTheme, changeLanguage } =
	AppSettingSlice.actions;
export default AppSettingSlice.reducer;
