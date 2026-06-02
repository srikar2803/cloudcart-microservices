CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    brand VARCHAR(100),
    price NUMERIC(10,2),
    rating NUMERIC(2,1),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
