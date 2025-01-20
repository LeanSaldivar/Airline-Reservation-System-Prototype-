import mongoose from 'mongoose';

//Defining fields
const usersSchema = new mongoose.Schema({
    displayName: {
        type: mongoose.Schema.Types.String,
        required:true,
        unique:true,
    },
    firstName: {
        type: mongoose.Schema.Types.String,
        required:true,
    },

    lastName: {
        type: mongoose.Schema.Types.String,
        required:true,
    },

    email: {
        type: mongoose.Schema.Types.String,
        required:true,
        unique:true,
    },

    password: {
        type: mongoose.Schema.Types.String,
        required:true,
    },

    confirmPassword:{
        type: mongoose.Schema.Types.String,
        required:true,
    },
});

//Creates model and exports it
export const User = mongoose.model('User', usersSchema);
