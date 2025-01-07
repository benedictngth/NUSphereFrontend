CREATE TABLE IF NOT EXISTS USERS (
    id SERIAL PRIMARY KEY,
    public_id char(21) UNIQUE DEFAULT nanoid(21),
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
    
  );

CREATE TABLE IF NOT EXISTS CATEGORIES (
  -- usage purely internal for database management
    id SERIAL PRIMARY KEY, 
  -- usage for public facing API
    public_id char(21) UNIQUE DEFAULT nanoid(21),
    name TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    -- 0 mean it is the parent category
    parent_id INT DEFAULT 0,
    -- TO DO with reference to which user created the category
    created_by INT DEFAULT 1,

    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET DEFAULT
    -- created_at TIMESTAMP  DEFAULT NOW(),
    -- updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS POSTS (
  -- usage purely internal for database management
    id SERIAL PRIMARY KEY, 
  -- usage for public facing API
    public_id char(21) UNIQUE DEFAULT nanoid(21),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    user_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,

  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
  );


CREATE TABLE IF NOT EXISTS COMMENTS (
  -- usage purely internal for database management
    id SERIAL PRIMARY KEY, 
  -- usage for public facing API
    public_id char(21) UNIQUE DEFAULT nanoid(21),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    user_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,

  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (post_id) REFERENCES posts(id)
  );

