import { io } from "socket.io-client";
import { HOST } from "@env";

export const socket = io(HOST, {
    // transports: ["websocket"],
    forceNew: true
})