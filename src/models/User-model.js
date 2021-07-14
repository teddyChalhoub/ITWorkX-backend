import mongoose from "mongoose";
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    company: { type: String, required: false },
    nbofemployee: { type: String, required: false },
    country: { type: String, required: true },
    address: { type: String, required: true },
    notes: { type: String, required: false },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
export default User;
// module.exports = mongoose.model("user",userSchema);
