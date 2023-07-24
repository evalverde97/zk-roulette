import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {String, required: true, unique: true, trim: true},
  email: {String, required: true, unique: true, trim: true},
  password: {String, required: true, unique: true, trim: true, minlength: 6},
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('User', userSchema);