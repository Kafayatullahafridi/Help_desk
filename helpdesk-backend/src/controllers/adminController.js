import Ticket from "../models/Ticket.js";
import User from "../models/User.js";
import { AppError } from "../utils/errors.js";

export async function stats(_request, response) {
  const [totalTickets, open, inProgress, resolved, totalUsers, agents, priorities] = await Promise.all([
    Ticket.countDocuments(), Ticket.countDocuments({ status: "Open" }), Ticket.countDocuments({ status: "In progress" }), Ticket.countDocuments({ status: "Resolved" }), User.countDocuments(), User.countDocuments({ role: "agent", isActive: true }), Ticket.aggregate([{ $group: { _id: "$priority", count: { $sum: 1 } } }]),
  ]);
  response.json({ success: true, data: { totalTickets, open, inProgress, resolved, totalUsers, agents, priorities } });
}
export async function users(request, response) {
  const filter = request.query.search ? { $or: [{ name: new RegExp(request.query.search, "i") }, { email: new RegExp(request.query.search, "i") }] } : {};
  response.json({ success: true, data: await User.find(filter).select("-passwordHash").sort({ createdAt: -1 }) });
}
export async function updateUser(request, response) {
  if (String(request.user._id) === request.params.id && request.body.role && request.body.role !== request.user.role) throw new AppError(400, "You cannot change your own role.");
  const user = await User.findByIdAndUpdate(request.params.id, { $set: { role: request.body.role, isActive: request.body.isActive } }, { new: true, runValidators: true });
  if (!user) throw new AppError(404, "User not found.");
  response.json({ success: true, data: user.toSafeObject() });
}
