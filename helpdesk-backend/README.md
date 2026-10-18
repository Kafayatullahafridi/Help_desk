# Northstar Helpdesk API

Separate Express/MongoDB backend for the Northstar Helpdesk frontend.

## Setup

```bash
npm install
copy .env.example .env
npm run dev
```

The API defaults to `http://localhost:5001`.

## Main endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET|POST /api/tickets`
- `GET /api/tickets/:id`
- `POST /api/tickets/:id/comments`
- `PATCH /api/tickets/:id/status`
- `PATCH /api/tickets/:id/assign`
- `GET /api/admin/stats`
- `GET /api/admin/users`
- `PATCH /api/admin/users/:id`

Use `Authorization: Bearer <token>` for protected requests. Role permissions are enforced in the backend, not only in the UI.

Tickets and comments support an `attachments` array with `name`, `url`, `mimeType`, and optional `size`. The current frontend previews local image files; production persistence should upload images to object storage and send the returned metadata to these fields.
