CREATE TABLE IF NOT EXISTS CATEGORIES (
  -- usage purely internal for database management
    id SERIAL PRIMARY KEY, 
  -- usage for public facing API
    public_id char(21) UNIQUE DEFAULT nanoid(21),
    name TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL
    -- created_at TIMESTAMP  DEFAULT NOW(),
    -- updated_at TIMESTAMP DEFAULT NOW()
);