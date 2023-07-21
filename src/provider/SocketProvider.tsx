import {
	createContext,
	PropsWithChildren,
	useCallback,
	useEffect,
	useMemo,
} from "react";
import { io, Socket } from "socket.io-client";
import { useSelector, useDispatch } from "../utils/redux";
import { getActiveUsers } from "../toolkit/slices/chatSlice";

export const SocketContext = createContext<Socket | null>(null);

const SocketContextProvider = ({ children }: PropsWithChildren) => {
	const { info } = useSelector((store) => store.user);
	const socket = useMemo(
		() =>
			info
				? io("http://192.168.88.239:4000", { query: { id: info._id } })
				: null,
		[info],
	);

	const dispatch = useDispatch();

	const updateActiveUsers = useCallback(
		(users: string[]) => {
			dispatch(getActiveUsers(users));
		},
		[dispatch],
	);

	useEffect(() => {
		if (socket) {
			console.log("Setting up socket listener...");
			socket.on("sending-active-users", updateActiveUsers);
		}
		return () => {
			if (socket) {
				console.log("Cleaning up socket listener...");
				socket.off("sending-active-users", updateActiveUsers);
			}
		};
	}, [socket, dispatch]);

	return (
		<SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
	);
};

export default SocketContextProvider;
