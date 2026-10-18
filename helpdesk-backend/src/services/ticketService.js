import Ticket from "../models/Ticket.js";
import Comment from "../models/Comment.js";
import TicketActivity from "../models/TicketActivity.js";
import User from "../models/User.js";
import { AppError } from "../utils/errors.js";

const transitions = {
  Open: ["In progress", "Closed"],
  "In progress": ["Waiting for user", "Resolved", "Open"],
  "Waiting for user": ["In progress", "Resolved", "Closed"],
  Resolved: ["Closed", "In progress"],
  Closed: ["Open"],
};

function canAccess(ticket, user) {
  return user.role === "admin" || user.role === "agent" || String(ticket.creator._id || ticket.creator) === String(user._id);
}

export async function listTickets(user, query) {
  const filter = {};
  if (user.role === "user") filter.creator = user._id;
  if (query.status) filter.status = query.status;
  if (query.priority) filter.priority = query.priority;
  if (query.category) filter.category = query.category;
  if (query.assignee) filter.assignee = query.assignee;
  if (query.search) filter.$or = [{ ticketNumber: new RegExp(query.search, "i") }, { title: new RegExp(query.search, "i") }];
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(50, Math.max(1, Number(query.limit) || 20));
  const [items, total] = await Promise.all([
    Ticket.find(filter).populate("creator", "name email").populate("assignee", "name email").sort({ updatedAt: -1 }).skip((page - 1) * limit).limit(limit),
    Ticket.countDocuments(filter),
  ]);
  return { items, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
}

export async function createTicket(user, data) {
  const ticket = await Ticket.create({ ...data, creator: user._id });
  await TicketActivity.create({ ticket: ticket._id, actor: user._id, action: "created ticket", to: "Open" });
  return ticket.populate("creator", "name email");
}

export async function getTicket(user, id) {
  const ticket = await Ticket.findById(id).populate("creator", "name email").populate("assignee", "name email");
  if (!ticket) throw new AppError(404, "Ticket not found.");
  if (!canAccess(ticket, user)) throw new AppError(403, "You cannot access this ticket.");
  const commentFilter = user.role === "user" ? { ticket: id, isInternal: false } : { ticket: id };
  const [comments, activities] = await Promise.all([
    Comment.find(commentFilter).populate("author", "name role").sort({ createdAt: 1 }),
    TicketActivity.find({ ticket: id }).populate("actor", "name").sort({ createdAt: -1 }),
  ]);
  return { ticket, comments, activities };
}

export async function addComment(user, id, data) {
  const ticket = await Ticket.findById(id);
  if (!ticket) throw new AppError(404, "Ticket not found.");
  if (user.role === "user" && String(ticket.creator) !== String(user._id)) throw new AppError(403, "You cannot comment on this ticket.");
  if (data.isInternal && user.role === "user") throw new AppError(403, "Users cannot create internal notes.");
  const comment = await Comment.create({ ticket: id, author: user._id, ...data });
  return comment.populate("author", "name role");
}

export async function updateStatus(user, id, data) {
  const ticket = await Ticket.findById(id);
  if (!ticket) throw new AppError(404, "Ticket not found.");
  if (user.role === "user" && String(ticket.creator) !== String(user._id)) throw new AppError(403, "You cannot change this ticket.");
  if (user.role === "user" && data.status !== "Closed") throw new AppError(403, "Users may only close a ticket.");
  if (!transitions[ticket.status]?.includes(data.status)) throw new AppError(400, `Cannot move a ticket from ${ticket.status} to ${data.status}.`);
  const previous = ticket.status;
  ticket.status = data.status;
  if (data.resolution) ticket.resolution = data.resolution;
  await ticket.save();
  await TicketActivity.create({ ticket: id, actor: user._id, action: "changed status", from: previous, to: data.status });
  return ticket;
}

export async function assignTicket(user, id, assigneeId) {
  const assignee = await User.findOne({ _id: assigneeId, role: { $in: ["agent", "admin"] }, isActive: true });
  if (!assignee) throw new AppError(400, "A valid active support agent is required.");
  const ticket = await Ticket.findById(id);
  if (!ticket) throw new AppError(404, "Ticket not found.");
  ticket.assignee = assignee._id;
  if (ticket.status === "Open") ticket.status = "In progress";
  await ticket.save();
  await TicketActivity.create({ ticket: id, actor: user._id, action: "assigned ticket", to: assignee.name });
  return ticket.populate("assignee", "name email");
}
