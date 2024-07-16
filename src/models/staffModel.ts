import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
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
    father_name: {
        type: String,
    },
    mother_name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
    },
    gender: {
        type: String,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'Staff',
    },
    college_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'college',
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

const Staff = mongoose.models.staff || mongoose.model('staff', staffSchema);

export default Staff;