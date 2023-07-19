const brandSchema = new Schema({
    amount: {
        type: String,
        required: true,
        unique: true
    },
    logo: {
        type: Object,
        required: true
    },
    addedBy: {
        type: Types.ObjectId,
        required: true,
        ref: 'User'
    }
    }
, { timestamps: true });