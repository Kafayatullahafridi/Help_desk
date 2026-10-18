import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    ticket: { type: mongoose.Schema.Types.ObjectId, ref: "Ticket", required: true, index: true },
    actor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    action: { type: String, required: true, trim: true },
    from: String,
    to: String,
  },
  { timestamps: true },
);

export default mongoose.model("TicketActivity", activitySchema);
