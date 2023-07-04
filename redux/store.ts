import { configureStore } from "@reduxjs/toolkit";
import appSettings from "./appSettings";

const store = configureStore({
	reducer: {
		appSettings,
	},
});
export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
export type Slice = keyof RootState;

export default store;
