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
exports.updateRecipientStatus = void 0;
const client_1 = require("../../../node_modules/.prisma/client");
// import { timeStamp } from "console";
const prisma = new client_1.PrismaClient();
const updateRecipientStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, videoId, recipientVideoStatus } = req.body;
    try {
        // Find the Recipient entry based on userId and sendVideoId
        const recipient = yield prisma.recipient.findUnique({
            where: {
                unique_user_sendVideo_recipient: {
                    userId: userId,
                    sendVideoId: videoId,
                },
            },
        });
        if (!recipient) {
            // Handle the case where the Recipient entry is not found
            // throw new Error("Recipient not found");
            console.log("No Recipient Found to update status");
        }
        console.log("recipient:", recipient);
        // Update the status of the Recipient entry
        if (recipient) {
            let updatedRecipient;
            try {
                updatedRecipient = yield prisma.recipient.update({
                    where: { id: recipient.id },
                    data: { status: recipientVideoStatus },
                });
                console.log("updated recipient", updatedRecipient);
            }
            catch (error) {
                console.error("error to update", error);
            }
            console.log("Recipient status updated successfully");
            res.json({ Status: updatedRecipient === null || updatedRecipient === void 0 ? void 0 : updatedRecipient.status });
        }
    }
    catch (error) {
        console.error("Error updating recipient status:", error);
    }
    finally {
        yield prisma.$disconnect(); // Disconnect from the Prisma client
    }
});
exports.updateRecipientStatus = updateRecipientStatus;
