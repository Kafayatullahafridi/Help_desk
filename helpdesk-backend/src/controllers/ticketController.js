import { addComment, assignTicket, createTicket, getTicket, listTickets, updateStatus } from "../services/ticketService.js";
export async function index(request, response) { response.json({ success: true, data: await listTickets(request.user, request.query) }); }
export async function show(request, response) { response.json({ success: true, data: await getTicket(request.user, request.params.id) }); }
export async function create(request, response) { response.status(201).json({ success: true, data: await createTicket(request.user, request.body) }); }
export async function comment(request, response) { response.status(201).json({ success: true, data: await addComment(request.user, request.params.id, request.body) }); }
export async function status(request, response) { response.json({ success: true, data: await updateStatus(request.user, request.params.id, request.body) }); }
export async function assign(request, response) { response.json({ success: true, data: await assignTicket(request.user, request.params.id, request.body.assigneeId) }); }
