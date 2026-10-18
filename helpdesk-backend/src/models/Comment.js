import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    ticket: { type: mongoose.Schema.Types.ObjectId, ref: "Ticket", required: true, index: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    body: { type: String, required: true, trim: true, maxlength: 10000 },
    isInternal: { type: Boolean, default: false },
    attachments: [{
      name: { type: String, required: true, trim: true },
      url: { type: String, required: true, trim: true },
      mimeType: { type: String, required: true, trim: true },
      size: { type: Number, min: 0 },
    }],
  },
  { timestamps: true },
);

export default mongoose.model("Comment", commentSchema);
