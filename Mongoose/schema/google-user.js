import mongoose from "mongoose";

const googleUserSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
    googleId: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    }
});

export const GoogleUser = mongoose.model('GoogleUser', googleUserSchema);