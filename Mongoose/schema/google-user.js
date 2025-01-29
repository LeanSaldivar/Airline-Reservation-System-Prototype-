import mongoose from "mongoose";

const googleUserSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
        index: true,
    },
    googleId: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
    firstName: {
        type: mongoose.Schema.Types.String,
    },
    lastName: {
        type: mongoose.Schema.Types.String,
    },
    picture: {
        type: mongoose.Schema.Types.String, // URL of the user's profile picture
    },
    lastLogin: {
        type: mongoose.Schema.Types.Date,
        default: Date.now,
    },
    createdAt: {
        type: mongoose.Schema.Types.Date,
        default: Date.now,
    },
    tokens: {
        accessToken: {
            type: mongoose.Schema.Types.String,
            default: null,
        },
        refreshToken: {
            type: mongoose.Schema.Types.String,
            default: null,
        },
        expiresAt: {
            type: mongoose.Schema.Types.Date,
            default: null,
        },
    },
});

export const GoogleUser = mongoose.model('GoogleUser', googleUserSchema);
