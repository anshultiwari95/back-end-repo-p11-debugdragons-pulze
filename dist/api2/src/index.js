"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require("express");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const dotenv_1 = __importDefault(require("dotenv"));
const PORT = 8080;
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
dotenv_1.default.config();
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes"));
const videoRecorderCompletedRoutes_1 = __importDefault(require("./routes/videoRecorderCompletedRoutes"));
const authenticateTokenRoutes_1 = __importDefault(require("./routes/authenticateTokenRoutes"));
const commentRoutes_1 = __importDefault(require("./routes/gettingResponse/commentRoutes"));
const sendVideoRoute_1 = __importDefault(require("./routes/recordingCompleted/sendVideoRoute"));
const videoRoutes_1 = __importDefault(require("./routes/dashboard/videoRoutes"));
const updateRecipientStatusRoute_1 = __importDefault(require("./routes/gettingResponse/updateRecipientStatusRoute"));
const findingVideoRoute_1 = __importDefault(require("./routes/gettingResponse/findingVideoRoute"));
const workspaceRoutes_1 = __importDefault(require("./routes/workspaceRoutes"));
// import { User } from "../../web/types/index";
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Create http server using Express app
const server = http_1.default.createServer(app);
// Create socket.io server
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
    },
});
const rooms = {};
io.on("connection", (socket) => {
    console.log(`A user connected:${socket.id}`);
    socket.on("sendVideo", ({ recipients, videoObjectFromRecorder, }) => {
        console.log("send video backedn recipients", recipients);
        console.log("send video backedn videoobjectfromrecorder", videoObjectFromRecorder);
        const room = generateRoom(recipients);
        console.log(room);
        // Broadcast video object to all users in the room
        io.to(room).emit("receiveVideo", videoObjectFromRecorder);
    });
    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});
const generateRoom = (users) => {
    // Generate a room name based on user IDs
    const userIds = users
        .map((user) => user.userId)
        .sort()
        .join("-");
    const room = `room-${userIds}`;
    // Store users in the room
    rooms[room] = users;
    // Join all users to the room
    users.forEach((user) => {
        var _a;
        io.to(user.userId).emit("roomCreated", room);
        (_a = io.sockets.sockets.get(user.userId)) === null || _a === void 0 ? void 0 : _a.join(room);
    });
    return room;
};
app.use("/api", authRoutes_1.default);
app.use("/api", uploadRoutes_1.default);
app.use("/api", videoRecorderCompletedRoutes_1.default);
app.use("/api", authenticateTokenRoutes_1.default);
app.use("/api", commentRoutes_1.default);
app.use("/api", sendVideoRoute_1.default);
app.use("/api", videoRoutes_1.default);
app.use("/api", updateRecipientStatusRoute_1.default);
app.use("/api", findingVideoRoute_1.default);
app.use("/api", workspaceRoutes_1.default);
app.get("/api/home", (req, res) => {
    res.json({ message: "Hello world! from normal express" });
});
server.listen(PORT, () => {
    console.log("listening on port " + PORT);
});
