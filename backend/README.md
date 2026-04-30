# Backend CESIZen

API NestJS du projet CESIZen.

## Lancer le backend

```bash
npm install
docker compose up -d
npx prisma migrate deploy
npx prisma generate
npm run start:dev
```

L'API tourne sur `http://localhost:3000`.

## Routes principales

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`
- `PUT /auth/me`
- `DELETE /auth/me`
- `GET /informations`
- `GET /admin/users`
- `PUT /admin/users/:id`
- `DELETE /admin/users/:id`
- `POST /admin/informations`
- `PUT /admin/informations/:id`
- `DELETE /admin/informations/:id`
