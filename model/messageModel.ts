import mongoose, { Schema } from "mongoose";

const messageSchema: Schema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    messageStatus: {
        type: String,
        enum: ["SENT", "DELIVERED", "SEEN"],
        default: "SENT"
    },
    message: {
        type: String
    },
    messageType: {
        type: String,
        default: "text"
    }
}, {
    timestamps: true,
})

const Message = mongoose.models.messages || mongoose.model("messages", messageSchema)
export default Message;