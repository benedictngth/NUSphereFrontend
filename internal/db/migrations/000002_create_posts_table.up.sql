CREATE TABLE IF NOT EXISTS POSTS (
    id SERIAL PRIMARY KEY,
    title TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    user_public_id char(21) UNIQUE DEFAULT nanoid(21),

    FOREIGN KEY (user_public_id) REFERENCES users(user_public_id) 
  );