import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        minLength: [3, 'Name must be at least 3 characters'],
        maxLength: [50, 'Name must be less than 50 characters']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Invalid email address'
        ]
    },
    password: {
        type: String,
        select: false,
        validate: {
            validator: function(value) {
                return this.googleProvider || value; // password is required if not logging in via Google
            },
            message: 'Password is required'
        }
    },
    subscriptions: {
        type: Boolean,
        default: false
    }
});

export const User = models?.User || model('User', UserSchema);
