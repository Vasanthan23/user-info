import mongoose from 'mongoose';

const UserInfoSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('user-info', UserInfoSchema);
export default User;
