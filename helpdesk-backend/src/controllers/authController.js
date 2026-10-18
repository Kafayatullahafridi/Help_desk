import { loginUser, registerUser } from "../services/authService.js";
export async function register(request, response) { response.status(201).json({ success: true, data: await registerUser(request.body) }); }
export async function login(request, response) { response.json({ success: true, data: await loginUser(request.body) }); }
export function me(request, response) { response.json({ success: true, data: request.user.toSafeObject() }); }
