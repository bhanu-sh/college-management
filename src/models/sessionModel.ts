import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course',
    },
    start_date: {
        type: Date,
    },
    end_date: {
        type: Date,
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

const Session = mongoose.models.session || mongoose.model('session', sessionSchema);

export default Session;