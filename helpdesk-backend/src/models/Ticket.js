import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    ticketNumber: { type: String, unique: true, index: true },
    title: { type: String, required: true, trim: true, maxlength: 180 },
    description: { type: String, required: true, trim: true, maxlength: 10000 },
    category: { type: String, required: true, trim: true },
    priority: { type: String, enum: ["Low", "Medium", "High", "Critical"], default: "Medium", index: true },
    status: { type: String, enum: ["Open", "In progress", "Waiting for user", "Resolved", "Closed"], default: "Open", index: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null, index: true },
    resolution: { type: String, trim: true },
    attachments: [{
      name: { type: String, required: true, trim: true },
      url: { type: String, required: true, trim: true },
      mimeType: { type: String, required: true, trim: true },
      size: { type: Number, min: 0 },
    }],
  },
  { timestamps: true },
);

ticketSchema.pre("save", async function assignNumber(next) {
  if (this.ticketNumber) return next();
  const count = await mongoose.model("Ticket").countDocuments();
  this.ticketNumber = `NS-${String(1001 + count).padStart(4, "0")}`;
  return next();
});

export default mongoose.model("Ticket", ticketSchema);
