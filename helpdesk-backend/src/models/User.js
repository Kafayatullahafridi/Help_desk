import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ["user", "agent", "admin"], default: "user", index: true },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
);

userSchema.methods.toSafeObject = function toSafeObject() {
  return { id: this._id, name: this.name, email: this.email, role: this.role, isActive: this.isActive };
};

export default mongoose.model("User", userSchema);
