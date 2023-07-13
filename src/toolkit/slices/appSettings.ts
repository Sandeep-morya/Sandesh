import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IAppSettigs, Theme } from "../../../types";
import { getData, storeData } from "../../utils/asyncStorage";

const KEY = "sandesh-app-settings";
const initialState: IAppSettigs = {
	language: "en",
	mode: "dark",
	theme: "default",
};

const fetchAppSettings = createAsyncThunk(
	"app-settings/fetchAppSettings",
	async (): Promise<IAppSettigs> => {
		const data = await getData(KEY);
		return data || initialState;
	},
);

const appSettingSlice = createSlice({
	name: "app-settings",
	initialState,
	reducers: {
		toggleColorMode(state) {
			state.mode = state.mode === "dark" ? "light" : "dark";
			storeData(KEY, state);
		},
		changeTheme(state, action: PayloadAction<Theme>) {
			state.theme = action.payload;
			storeData(KEY, state);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchAppSettings.fulfilled, (_, action) => {
			return action.payload;
		});
	},
});

// :: Exports ::
export { fetchAppSettings };
export const { toggleColorMode, changeTheme } = appSettingSlice.actions;
export default appSettingSlice.reducer;
