import { configureStore } from "@reduxjs/toolkit";
import appSettings from "./slices/appSettings";
const store = configureStore({
	reducer: {
		appSettings,
	},
});

// :: Helper Types ::
export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
export type Slice = keyof RootState;

export default store;
