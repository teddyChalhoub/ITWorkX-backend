import mongoose from "mongoose";
const schema = mongoose.Schema;

const userRoleSchema = new schema(
  {
    user_id: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
    },
    role_id:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "role",
    },
  },
  { timestamps: true } 
);

const UserRole = mongoose.model("user-role", userRoleSchema);
export default UserRole;
