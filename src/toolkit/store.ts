﻿import { configureStore } from "@reduxjs/toolkit";
import appSettings from "./slices/appSettings";
import user from "./slices/userSlice";
import chatReducer from "./slices/chatSlice";
const store = configureStore({
	reducer: {
		appSettings,
		user,
		chatReducer
	},
});

// :: Helper Types ::
export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
export type Slice = keyof RootState;

export default store;
