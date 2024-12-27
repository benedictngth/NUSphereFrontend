CREATE TABLE IF NOT EXISTS POSTS (
  -- usage purely internal for database management
    id SERIAL PRIMARY KEY, 
  -- usage for public facing API
    post_public_id char(21) UNIQUE DEFAULT nanoid(21),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    user_public_id char(21) DEFAULT nanoid(21)

  --requires user_public_id to be unique for foreign key constraint
  -- FOREIGN KEY (user_public_id) REFERENCES users(user_public_id) 
  );