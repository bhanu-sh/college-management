import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    avatar: {
        type: String,
        default: 'https://www.gravatar.com/avatar/?d=mp',
    },
    f_name: {
        type: String,
    },
    l_name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'Admin',
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
})

const Admin = mongoose.models.admin || mongoose.model('admin', adminSchema);

export default Admin;