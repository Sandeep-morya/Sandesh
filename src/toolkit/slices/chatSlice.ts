import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ChatSlice } from "../../../types";

const initialState: ChatSlice = {
	activeUsers: null,
	messages: null,
};

const chatSlice = createSlice({
	name: "chat-slice",
	initialState,
	reducers: {
		getActiveUsers(state, action: PayloadAction<string[]>) {
			state.activeUsers = action.payload;
		},
	},
});

export const { getActiveUsers } = chatSlice.actions;
export default chatSlice.reducer;
