import { Schema, model, models } from "mongoose";
import mongoose from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique:true,

    },
    phone: {
        type: Number,
        required: true,
        unique:true,

    },
    password: {
        type: String,
        required: true,

    },
    address: {
        type: String,
        default:""

    },
    city: {
        type: String,
        default:""

    },
    state: {
        type: String,
        default:""

    },
    pincode: {
        type: String,
        default:""

    },
    


}, { timestamps: true });

const User = models.User || model('User', UserSchema);

export default User;