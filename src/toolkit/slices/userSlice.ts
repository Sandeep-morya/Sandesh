import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUserSlice } from "../../../types";
import { getData, storeData } from "../../utils/asyncStorage";

const KEY = "userdata";

const initialState: IUserSlice = {
	token: "",
	info: null,
	loading: false,
	error: false,
};

const fetchUserData = createAsyncThunk(
	"fetch/userdata",
	async (): Promise<IUserSlice> => {
		const data = await getData(KEY);
		return data || initialState;
	},
);

const userSlice = createSlice({
	name: "user-slice",
	initialState,
	reducers: {
		addToken(state, action: PayloadAction<string>) {
			state.token = action.payload;
			storeData(KEY, state);
		},
		addUserInfo(state, action: PayloadAction<IUser>) {
			state.info = action.payload;
			storeData(KEY, state);
		},
		updateUserInfo(state, action: PayloadAction<any>) {
			state.info = { ...state.info, ...action.payload };
			storeData(KEY, state);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUserData.fulfilled, (_, action) => {
				return action.payload;
			})
			.addCase(fetchUserData.pending, (state) => {
				return { ...state, loading: true, error: false };
			})
			.addCase(fetchUserData.rejected, (state) => {
				return { ...state, loading: false, error: true };
			});
	},
});

export { fetchUserData };
export const { addToken, addUserInfo, updateUserInfo } = userSlice.actions;
export default userSlice.reducer;
