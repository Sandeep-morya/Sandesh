import {
	useSelector as selector,
	useDispatch as dispatch,
	TypedUseSelectorHook,
} from "react-redux";
import { RootState, Dispatch, Slice } from "./store";

export const useDispatch = () => dispatch<Dispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selector;
export const useSlice = (slice: Slice) => useSelector((store) => store[slice]);
