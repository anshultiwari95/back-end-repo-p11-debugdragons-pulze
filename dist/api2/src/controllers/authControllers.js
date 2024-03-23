"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserNameContoller = exports.getUserInfoContoller = exports.registerOrLogin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// import User from "../model/usermodel";
const dotenv_1 = require("dotenv");
const client_1 = require("../../node_modules/.prisma/client");
const prisma = new client_1.PrismaClient();
// Load environment variables
(0, dotenv_1.config)();
const registerOrLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hello login called");
    console.log(req.body);
    const { email, password, phonenumber } = req.body;
    let oneUser;
    try {
        const token = jsonwebtoken_1.default.sign({
            email: email,
        }, process.env.SECRET_KEY);
        const user = yield prisma.user.findUnique({ where: { email: email } });
        console.log(user);
        if (!user) {
            // No user, registration will be done
            //   const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            // console.log(hashedPassword);
            const name = req.body.email.split("@")[0];
            console.log(name);
            //   await prisma.user.create({
            //     data:{
            //         email: req.body.email,
            //         password: hashedPassword,
            //         name:name
            //     }
            //   });
            oneUser = yield prisma.user.create({
                data: {
                    email: req.body.email,
                    name: name,
                    password: hashedPassword,
                    phonenumber: phonenumber,
                },
            });
            try {
                const workspace = yield prisma.workspace.create({
                    data: {
                        name: name,
                        workspace_creator_id: oneUser.id,
                    },
                });
                // Create WorkspaceMember and connect to the created Workspace
                const workspaceMember = yield prisma.workspaceMember.create({
                    data: {
                        user_id: oneUser.id,
                        workspace_id: workspace.workspace_id,
                    },
                });
                console.log(workspace);
            }
            catch (error) {
                console.error("Error creating workspace:", error);
                return res
                    .status(500)
                    .json({ status: "error", error: "Workspace creation failed" });
            }
            console.log(oneUser);
            return res.json({ message: "Registration Successful", token: token });
        }
        else {
            if (user.password !== null) {
                const isPasswordValid = yield bcrypt_1.default.compare(req.body.password, user.password);
                // User exists, login will be done
                if (isPasswordValid) {
                    return res.json({ message: "Login Successful", token: token });
                }
                else {
                    console.log(isPasswordValid);
                    return res
                        .status(401)
                        .json({ status: "error", error: "Incorrect password" });
                }
            }
        }
    }
    catch (error) {
        res.json({
            status: "error",
            error: "Authentication error occurredence",
            user: oneUser,
        });
    }
});
exports.registerOrLogin = registerOrLogin;
// export const dashboard = async (req: Request, res: Response) => {
//   const token = req.header("x-access-token");
//   try {
//     const decoded: any = jwt.verify(token!, process.env.SECRET_KEY!);
//     const email = decoded.email;
//     const user = await User.findOne({ email: email });
//     if (user) {
//       const name = user.email.split("@")[0];
//       res.json({ message: "Authenticated email found", name: name, status: "ok" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ status: "error", error: "Invalid token" });
//   }
// };
const getUserInfoContoller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.query;
    try {
        if (!user_id) {
            return res.status(400).json({ error: "User ID is required" });
        }
        const userInfo = yield prisma.user.findUnique({
            where: {
                id: String(user_id)
            }
        });
        return res.json({ userInfo: userInfo });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.getUserInfoContoller = getUserInfoContoller;
const updateUserNameContoller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, user_name } = req.body;
    try {
        if (!user_id) {
            return res.status(400).json({ error: "User ID is required" });
        }
        const updatedRecipient = yield prisma.user.update({
            where: { id: String(user_id) },
            data: { name: user_name },
        });
        const user = yield prisma.workspace.findUnique({ where: { workspace_id: String(user_id) } });
        return res.json({ user });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.updateUserNameContoller = updateUserNameContoller;
