﻿import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IAppSettigs, Language } from "../types";
import { getData, storeData } from "../utlis/asyncStorage";

let initialState: IAppSettigs = {
	theme: "light",
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
		toggleTheme(state) {
			state.theme = state.theme === "dark" ? "light" : "dark";
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

export const { toggleTheme, changeLanguage } = AppSettingSlice.actions;
export default AppSettingSlice.reducer;