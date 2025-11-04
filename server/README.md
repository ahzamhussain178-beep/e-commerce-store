# Rocket server (scaffold)

This is a minimal scaffold for the Rocket e-commerce backend. It includes:
- Express server
- Prisma ORM with PostgreSQL
- Docker Compose for a local Postgres + Adminer
- Basic auth routes (OTP + admin login) and products endpoints

Quick start (local development):

1. Start Postgres + Adminer:

```bash
docker-compose up -d
```

2. Set your DATABASE_URL in `.env` (copy from `.env.example`).

3. Install packages and run Prisma migrate + seed:

```bash
cd server
npm install
npx prisma generate
npm run migrate
npm run seed
```

4. Start server:

```bash
npm run dev
```

Notes:
- OTP endpoint (`POST /auth/request-otp`) will send SMS via Twilio if `TWILIO_SID`, `TWILIO_TOKEN` and `TWILIO_FROM` are set in your `.env`. Otherwise it returns the `devCode` in the response for testing.
- Admin user is created by the seed script with email `admin@zzqstores.com` and password `Admin123!`.
