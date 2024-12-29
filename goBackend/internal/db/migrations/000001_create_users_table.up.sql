CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    public_id char(21) UNIQUE DEFAULT nanoid(21),
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
    
  );