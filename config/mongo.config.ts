import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const conn = mongoose.connection;

        conn.on('connected', () => {
            console.log("mongodb connected successfully");
        })

        conn.on('error', (err) => {
            console.log("mongodb connection errror. please make sure your mongodb connection is working!" + err.message);
            process.exit();
        })
    } catch (err) {
        console.log("something went wrong", err);
    }
}