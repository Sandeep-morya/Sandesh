import { useContext } from "react";
import { SocketContext } from "../provider/SocketProvider";

const useSocket = () => useContext(SocketContext);

export default useSocket;
