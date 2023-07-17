const brandSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    logo: {
        type: Object,
        required: true
    },
    createdBy: {
        type: Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, { timestamps: true });