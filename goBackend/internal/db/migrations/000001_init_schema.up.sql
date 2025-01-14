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
    public_id char(21) UNIQUE DEFAULT nanoid(21) NOT NULL,
    name TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    -- PARENT mean it is a parent category
    parent_id TEXT DEFAULT 'PARENT' NOT NULL,
    -- created_by is the user public_id who created the category
    created_by INT  DEFAULT 1 NOT NULL,

    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
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
  -- DELETES ALL COMMENTS ASSOCIATED WITH A POST WHEN THE POST IS DELETED
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
  );
