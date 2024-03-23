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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWorkspaceNameContoller = exports.removeWorkspaceMemberContoller = exports.getWorkspaceMemberContoller = exports.addWorkspaceMemberContoller = exports.leaveWorkspaceContoller = exports.deleteWorkspaceContoller = exports.getWorkspaceByUserContoller = exports.getAllWorkspaceMemberContoller = exports.getWorkspaceContoller = exports.createNewWorkspaceContoller = void 0;
const client_1 = require("../../node_modules/.prisma/client");
const prisma = new client_1.PrismaClient();
const createNewWorkspaceContoller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { workspace_name, creater_id } = req.body;
    try {
        if (!creater_id) {
            return res.status(400).json({ error: "Creater ID is required" });
        }
        const workspace = yield prisma.workspace.create({
            data: {
                name: workspace_name,
                workspace_creator_id: creater_id,
            }
        });
        const new_workspace = yield prisma.workspace.findUnique({
            where: {
                workspace_id: workspace.workspace_id
            }
        });
        const workspaceMember = yield prisma.workspaceMember.create({
            data: {
                user_id: creater_id,
                workspace_id: workspace.workspace_id,
            }
        });
        return res.json({ workspace: new_workspace });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.createNewWorkspaceContoller = createNewWorkspaceContoller;
const getWorkspaceContoller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { workspace_id } = req.query;
    try {
        if (!workspace_id) {
            return res.status(400).json({ error: "Workspace ID is required" });
        }
        const workspace = yield prisma.workspace.findUnique({ where: { workspace_id: String(workspace_id) } });
        return res.json({ workspace: workspace });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.getWorkspaceContoller = getWorkspaceContoller;
const getAllWorkspaceMemberContoller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { workspace_id } = req.query;
    try {
        if (!workspace_id) {
            return res.status(400).json({ error: "Creater ID is required" });
        }
        const workspaceMember = yield prisma.workspaceMember.findMany({ where: { workspace_id: String(workspace_id) } });
        return res.json({ workspaceMember: workspaceMember });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.getAllWorkspaceMemberContoller = getAllWorkspaceMemberContoller;
const getWorkspaceByUserContoller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.query;
    try {
        if (!user_id) {
            return res.status(400).json({ error: "User ID is required" });
        }
        const workspacesMembers = yield prisma.workspaceMember.findMany({
            where: {
                user_id: String(user_id)
            }
        });
        const workspaces = [];
        console.log(workspacesMembers);
        for (let i = 0; i < workspacesMembers.length; i++) {
            const workspace = yield prisma.workspace.findUnique({
                where: {
                    workspace_id: String(workspacesMembers[i].workspace_id)
                }
            });
            if (workspace) {
                workspaces.push(workspace);
            }
        }
        return res.json({ workspaces });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.getWorkspaceByUserContoller = getWorkspaceByUserContoller;
const deleteWorkspaceContoller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { workspace_id, user_id } = req.body;
    try {
        if (!workspace_id) {
            return res.status(400).json({ error: "Workspace ID is required" });
        }
        const workspace = yield prisma.workspace.findUnique({ where: { workspace_id: String(workspace_id) } });
        if ((workspace === null || workspace === void 0 ? void 0 : workspace.workspace_creator_id) !== user_id) {
            return res.status(500).json({ error: "Only Owner can delete the workspace" });
        }
        const workspaceMemberDeleted = yield prisma.workspaceMember.deleteMany({
            where: {
                workspace_id: workspace_id
            }
        });
        const workspacesDeleted = yield prisma.workspace.delete({
            where: {
                workspace_id: workspace_id
            }
        });
        return res.json({ message: "Workspace Deleted Successful" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.deleteWorkspaceContoller = deleteWorkspaceContoller;
const leaveWorkspaceContoller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { workspace_id, user_id } = req.body;
    console.log("leave workspace entered");
    try {
        if (!workspace_id) {
            return res.status(400).json({ error: "Workspace ID is required" });
        }
        if (!user_id) {
            return res.status(400).json({ error: "User ID is required" });
        }
        const workspace = yield prisma.workspace.findUnique({
            where: {
                workspace_id: workspace_id
            }
        });
        const allWorkspaceMember = yield prisma.workspaceMember.findMany({
            where: {
                workspace_id: workspace_id
            }
        });
        console.log("allWorkspaceMember", allWorkspaceMember);
        const workspaceMember = yield prisma.workspaceMember.findMany({
            where: {
                workspace_id: workspace_id,
                user_id: user_id
            }
        });
        if (!workspace) {
            return res.status(400).json({ error: "Workspace doesn't exist" });
        }
        if (allWorkspaceMember.length < 2) {
            return res.status(400).json({ error: "Can't leave workspace with no members" });
        }
        if (workspace.workspace_creator_id == user_id) {
            const workspaceMemberId = allWorkspaceMember[0];
            const updatedRecipient = yield prisma.workspace.update({
                where: { workspace_id: workspace_id },
                data: { workspace_creator_id: workspaceMemberId.user_id },
            });
            const workspaceMemberDeleted = yield prisma.workspaceMember.deleteMany({
                where: {
                    workspace_id: workspace_id,
                    user_id: user_id
                }
            });
        }
        else {
            const workspaceMemberDeleted = yield prisma.workspaceMember.deleteMany({
                where: {
                    workspace_id: workspace_id,
                    user_id: user_id
                }
            });
        }
        return res.json({ message: "Workspace Left Successful" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.leaveWorkspaceContoller = leaveWorkspaceContoller;
const addWorkspaceMemberContoller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { workspace_id, user_email } = req.body;
    try {
        if (!workspace_id) {
            return res.status(400).json({ error: "Workspace ID is required" });
        }
        const user = yield prisma.user.findFirst({
            where: {
                email: user_email
            }
        });
        if (!(user === null || user === void 0 ? void 0 : user.id)) {
            return res.status(400).json({ error: "User ID not found, invite" });
        }
        const workspace = yield prisma.workspace.findUnique({
            where: {
                workspace_id: workspace_id
            }
        });
        if (!workspace) {
            return res.status(400).json({ error: "Workspace doesn't exist" });
        }
        const createWorkspace = yield prisma.workspaceMember.create({
            data: {
                user_id: user.id,
                workspace_id: workspace_id
            }
        });
        return res.json({ message: "Workspace Member Updated Successful" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.addWorkspaceMemberContoller = addWorkspaceMemberContoller;
const getWorkspaceMemberContoller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { workspace_id } = req.query;
    try {
        if (!workspace_id) {
            return res.status(400).json({ error: "Workspace ID is required" });
        }
        const workspaceMember = yield prisma.workspaceMember.findMany({
            where: {
                workspace_id: String(workspace_id)
            }
        });
        const workspace = yield prisma.workspace.findUnique({
            where: {
                workspace_id: String(workspace_id)
            }
        });
        const workspaceMembersList = [];
        for (let i = 0; i < workspaceMember.length; i++) {
            const workspaceUser = yield prisma.user.findUnique({
                where: {
                    id: String(workspaceMember[i].user_id)
                }
            });
            if (workspaceUser) {
                const role = workspaceMember[i].user_id == (workspace === null || workspace === void 0 ? void 0 : workspace.workspace_creator_id) ? "admin" : "member";
                workspaceMembersList.push(Object.assign(Object.assign({}, workspaceUser), { role: role }));
            }
        }
        return res.json({ workspaceMembers: workspaceMembersList });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.getWorkspaceMemberContoller = getWorkspaceMemberContoller;
const removeWorkspaceMemberContoller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { workspace_id, user_id } = req.body;
    try {
        if (!workspace_id) {
            return res.status(400).json({ error: "Workspace ID is required" });
        }
        if (!user_id) {
            return res.status(400).json({ error: "User ID is required" });
        }
        const workspaceMember = yield prisma.workspaceMember.deleteMany({
            where: {
                workspace_id: String(workspace_id),
                user_id: String(user_id)
            }
        });
        return res.json({ message: "Workspace Member Deleted Successful" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.removeWorkspaceMemberContoller = removeWorkspaceMemberContoller;
const updateWorkspaceNameContoller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { workspace_id, workspaceName } = req.body;
    try {
        if (!workspace_id) {
            return res.status(400).json({ error: "Workspace ID is required" });
        }
        const updatedRecipient = yield prisma.workspace.update({
            where: { workspace_id: workspace_id },
            data: { name: workspaceName },
        });
        const workspaces = yield prisma.workspace.findUnique({ where: { workspace_id: String(workspace_id) } });
        return res.json({ workspaces });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.updateWorkspaceNameContoller = updateWorkspaceNameContoller;
