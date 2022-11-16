import { Request } from "express";
import mongoose from "mongoose";
import { User } from "./user";

export interface RequestWithCurrentUser extends Request {
    currentUser: User
    session: {
        _id: string
    }
}