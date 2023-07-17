const reviewSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    createdBy: {
        type: Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, { timestamps: true });

const reviewModel = mongoose.models.Review||model('Review', reviewSchema)
export default reviewModel ;