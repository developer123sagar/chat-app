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
        enum: ["Sent", "Delivered", "Seen"],
        default: "Sent"
    },
    message: {
        type: String
    },
}, {
    timestamps: true,
})

const Message = mongoose.models.messages || mongoose.model("messages", messageSchema)
export default Message;