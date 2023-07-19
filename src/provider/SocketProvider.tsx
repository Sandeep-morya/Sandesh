import { createContext, PropsWithChildren, useMemo } from "react";
import { io, Socket } from "socket.io-client";

export const SocketContext = createContext(null as Socket | null);

const SocketContextProvider = ({ children }: PropsWithChildren) => {
	const socket = useMemo(() => io("http://192.168.1.4:4000"), []);
	return (
		<SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
	);
};

export default SocketContextProvider;
