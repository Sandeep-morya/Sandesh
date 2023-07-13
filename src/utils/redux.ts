import {
	useSelector as selector,
	useDispatch as dispatch,
	TypedUseSelectorHook,
} from "react-redux";
import { RootState, Dispatch, Slice } from "../toolkit/store";

const useSelector: TypedUseSelectorHook<RootState> = selector;
const useDispatch = () => dispatch<Dispatch>();
const useSlice = (slice: Slice) => useSelector((store) => store[slice]);

export { useSelector, useDispatch, useSlice };
