import mongoose from "mongoose";
const schema = mongoose.Schema;

const roleSchema = new schema(
  {
    name: { type: String },
    
  },
  { timestamps: true } 
);

const Role = mongoose.model("role", roleSchema);
export default Role;
