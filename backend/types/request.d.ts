import { Request } from "express";
import mongoose from "mongoose";

export interface RequestWithCurrentUser extends Request {
    currentUser: {
        id: string
        email: String,
        password: String,
        items: [mongoose.Types.ObjectId]
    }
    session: {
        id: string
    }
}