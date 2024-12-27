CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    user_public_id char(21) UNIQUE DEFAULT nanoid(21)
  );