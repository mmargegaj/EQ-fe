// import io from "socket.io-client";

const socket = new WebSocket("ws://62.171.176.99:3000");
socket.addEventListener("open", () => console.log("socket connected"));

export default socket;
