import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
    },
    image : {
        type: String,
        default: 'https://www.gravatar.com/avatar/?d=mp',
    },
    phone : {
        type: String,
        required: true,
    },
    address : {
        type: String,
        required: true,
    },
    city : {
        type: String,
        required: true,
    },
    state : {
        type: String,
        required: true,
    },
    pincode : {
        type: String,
        required: true,
    },
    created_at : {
        type: Date,
        default: Date.now,
    },
    updated_at : {
        type: Date,
        default: Date.now,
    },
})

const College = mongoose.models.college || mongoose.model('college', collegeSchema);

export default College;