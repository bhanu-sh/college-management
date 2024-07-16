import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    name : {
        type: String,
    },
    duration : {
        type: String,
    },
    fee : {
        type: Number,
    },
    college_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'college',
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

const Course = mongoose.models.course || mongoose.model('course', courseSchema);

export default Course;