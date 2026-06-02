const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const redis = require("redis");

const app = express();

app.use(cors());


// =========================
// PostgreSQL Connection
// =========================

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432
});


// =========================
// Redis Connection
// =========================

const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:6379`
});

redisClient.connect()
  .then(() => console.log("Connected to Redis"))
  .catch(err => console.error(err));


// =========================
// Wait for PostgreSQL
// =========================

async function waitForDB() {

  while (true) {

    try {

      const client = await pool.connect();

      console.log("Connected to PostgreSQL");

      client.release();

      break;

    } catch (err) {

      console.log("Waiting for PostgreSQL...");

      await new Promise(resolve => setTimeout(resolve, 5000));

    }

  }

}

waitForDB();


// =========================
// Home API
// =========================

app.get("/", (req, res) => {

  res.json({
    service: "Product Service",
    status: "running"
  });

});


// =========================
// Products API + Pagination + Redis Cache
// =========================

app.get("/products", async (req, res) => {

  try {

    const page = parseInt(req.query.page) || 1;

    const limit = parseInt(req.query.limit) || 20;

    const offset = (page - 1) * limit;

    const cacheKey = `products:${page}:${limit}`;


    // =========================
    // Check Redis Cache
    // =========================

    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {

      console.log("Serving from Redis Cache");

      return res.json(JSON.parse(cachedData));

    }


    // =========================
    // Fetch from PostgreSQL
    // =========================

    console.log("Fetching from PostgreSQL");

    const result = await pool.query(

      `SELECT * FROM products
       LIMIT $1 OFFSET $2`,

      [limit, offset]

    );

    const response = {
      page,
      limit,
      total: result.rowCount,
      products: result.rows
    };


    // =========================
    // Save to Redis
    // =========================

    await redisClient.setEx(
      cacheKey,
      60,
      JSON.stringify(response)
    );

    res.json(response);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Database error"
    });

  }

});


// =========================
// Category Filter API
// =========================

app.get("/products/category/:category", async (req, res) => {

  try {

    const category = req.params.category;

    const result = await pool.query(

      `SELECT * FROM products
       WHERE category = $1
       LIMIT 50`,

      [category]

    );

    res.json(result.rows);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Database error"
    });

  }

});


// =========================
// Brand Filter API
// =========================

app.get("/products/brand/:brand", async (req, res) => {

  try {

    const brand = req.params.brand;

    const result = await pool.query(

      `SELECT * FROM products
       WHERE brand = $1
       LIMIT 50`,

      [brand]

    );

    res.json(result.rows);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Database error"
    });

  }

});


// =========================
// Search API
// =========================

app.get("/products/search/:keyword", async (req, res) => {

  try {

    const keyword = req.params.keyword;

    const result = await pool.query(

      `SELECT * FROM products
       WHERE name ILIKE $1
       LIMIT 50`,

      [`%${keyword}%`]

    );

    res.json(result.rows);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Database error"
    });

  }

});


// =========================
// Sorting API
// =========================

app.get("/products/sort/:field", async (req, res) => {

  try {

    const field = req.params.field;

    let query = "";

    if (field === "price") {

      query = `
        SELECT * FROM products
        ORDER BY price DESC
        LIMIT 50
      `;

    } else if (field === "rating") {

      query = `
        SELECT * FROM products
        ORDER BY rating DESC
        LIMIT 50
      `;

    } else {

      return res.status(400).json({
        error: "Invalid sort field"
      });

    }

    const result = await pool.query(query);

    res.json(result.rows);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Database error"
    });

  }

});


// =========================
// Start Server
// =========================

app.listen(5001, () => {

  console.log("Product service running on port 5001");

});

