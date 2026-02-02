import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: [{
        type: String // Hum skills ko list mein rakhenge (AI matching ke liye best hai)
    }],
    salary: {
        type: Number,
        required: true
    },
    experienceLevel: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true // Full-time, Part-time, etc.
    },
    position: {
        type: Number,
        required: true // Kitni vacancies hain?
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company', // Relation with Company Model
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Kis Recruiter ne post kiya?
        required: true
    },
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application', // Relation with Application Model (Jo hum next banayenge)
        }
    ]
}, { timestamps: true });

export const Job = mongoose.model("Job", jobSchema);