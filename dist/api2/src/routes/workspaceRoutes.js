"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const workspaceController_1 = require("../controllers/workspaceController");
const router = express_1.default.Router();
router.post("/create-new-workspace", workspaceController_1.createNewWorkspaceContoller);
router.get("/get-workspace", workspaceController_1.getWorkspaceContoller);
router.get("/get-workspace-by-user", workspaceController_1.getWorkspaceByUserContoller);
router.post("/delete-workspace", workspaceController_1.deleteWorkspaceContoller);
router.post("/update-workspace", workspaceController_1.deleteWorkspaceContoller);
router.post("/leave-workspace", workspaceController_1.leaveWorkspaceContoller);
router.post("/update-workspace-name", workspaceController_1.updateWorkspaceNameContoller);
router.get("/get-workspace-members", workspaceController_1.getWorkspaceMemberContoller);
router.post("/add-workspace-members", workspaceController_1.addWorkspaceMemberContoller);
exports.default = router;
