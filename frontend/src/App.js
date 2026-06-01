import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  ShoppingCart,
  Heart,
  Star,
  Search
} from "lucide-react";

import { motion } from "framer-motion";

function App() {

  // =========================
  // STATES
  // =========================

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("");

  const [cart, setCart] = useState([]);

  const [showCart, setShowCart] = useState(false);

  const [page, setPage] = useState(1);

  // =========================
  // FETCH PRODUCTS
  // =========================

  const fetchProducts = async (pageNumber = 1) => {

    try {

      setLoading(true);

      const res = await axios.get(
        `http://localhost:5501/products?page=${pageNumber}&limit=20`
      );

      setProducts(res.data.products);

      setLoading(false);

    } catch (err) {

      console.log(err);

      setLoading(false);

    }

  };

  // =========================
  // SEARCH PRODUCTS
  // =========================

  const searchProducts = async (keyword) => {

    try {

      setLoading(true);

      if (keyword.trim() === "") {

        fetchProducts(page);

        return;

      }

      const res = await axios.get(
        `http://localhost:5501/products/search/${keyword}`
      );

      setProducts(res.data);

      setLoading(false);

    } catch (err) {

      console.log(err);

      setLoading(false);

    }

  };

  // =========================
  // CATEGORY FILTER
  // =========================

  const filterCategory = async (category) => {

    try {

      setLoading(true);

      setSelectedCategory(category);

      const res = await axios.get(
        `http://localhost:5501/products/category/${category}`
      );

      setProducts(res.data);

      setLoading(false);

    } catch (err) {

      console.log(err);

      setLoading(false);

    }

  };

  // =========================
  // ADD TO CART
  // =========================

  const addToCart = (product) => {

    setCart([...cart, product]);

  };

  // =========================
  // REMOVE FROM CART
  // =========================

  const removeFromCart = (index) => {

    const updatedCart = [...cart];

    updatedCart.splice(index, 1);

    setCart(updatedCart);

  };

  // =========================
  // TOTAL PRICE
  // =========================

  const totalPrice = cart.reduce(
    (total, item) => total + Number(item.price),
    0
  );

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {

    fetchProducts(page);

  }, [page]);

  return (

    <div
      style={{
        background: "#050816",
        minHeight: "100vh",
        color: "white",
        fontFamily: "Poppins, sans-serif",
        overflowX: "hidden"
      }}
    >

      {/* ========================= */}
      {/* NAVBAR */}
      {/* ========================= */}

      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 40px",
          backdropFilter: "blur(20px)",
          background: "rgba(0,0,0,0.4)",
          borderBottom: "1px solid rgba(255,255,255,0.1)"
        }}
      >

        <h1
          style={{
            fontSize: "48px",
            fontWeight: "900",
            background:
              "linear-gradient(to right,#ff00cc,#3333ff,#00d4ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          CloudCart
        </h1>

        {/* SEARCH */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "rgba(255,255,255,0.08)",
            padding: "12px 20px",
            borderRadius: "40px",
            width: "450px"
          }}
        >

          <Search size={20} />

          <input
            type="text"
            placeholder="Search luxury products..."
            value={search}
            onChange={(e) => {

              setSearch(e.target.value);

              searchProducts(e.target.value);

            }}
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: "white",
              marginLeft: "10px",
              width: "100%",
              fontSize: "16px"
            }}
          />

        </div>

        {/* CART BUTTON */}

        <button
          onClick={() => setShowCart(!showCart)}
          style={{
            background:
              "linear-gradient(to right,#ff0080,#7928ca)",
            border: "none",
            padding: "15px 25px",
            borderRadius: "30px",
            color: "white",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >

          <ShoppingCart size={20} />

          Cart ({cart.length})

        </button>

      </div>

      {/* ========================= */}
      {/* HERO SECTION */}
      {/* ========================= */}

      <div
        style={{
          margin: "30px",
          height: "450px",
          borderRadius: "40px",
          background:
            "linear-gradient(to right,#0f0c29,#302b63,#24243e)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden"
        }}
      >

        <div
          style={{
            position: "absolute",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "rgba(255,0,255,0.2)",
            filter: "blur(100px)"
          }}
        />

        <motion.h1

          initial={{ opacity: 0, y: 50 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ duration: 1 }}

          style={{
            fontSize: "90px",
            fontWeight: "900",
            zIndex: 2
          }}
        >

          FUTURE SHOPPING

        </motion.h1>

        <p
          style={{
            fontSize: "24px",
            color: "#ddd",
            zIndex: 2
          }}
        >
          Fashion • Electronics • Luxury • Lifestyle
        </p>

      </div>

      {/* ========================= */}
      {/* CATEGORY FILTERS */}
      {/* ========================= */}

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          padding: "20px 30px"
        }}
      >

        {

          [
            "Mobiles",
            "Electronics",
            "Clothing",
            "Fashion",
            "Accessories"
          ].map((category) => (

            <button

              key={category}

              onClick={() => filterCategory(category)}

              style={{
                padding: "14px 25px",
                borderRadius: "30px",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "15px",

                background:

                  selectedCategory === category
                    ? "linear-gradient(to right,#ff0080,#7928ca)"
                    : "rgba(255,255,255,0.08)",

                color: "white"
              }}

            >

              {category}

            </button>

          ))

        }

        {/* ALL PRODUCTS */}

        <button

          onClick={() => {

            setSelectedCategory("");

            fetchProducts(page);

          }}

          style={{
            padding: "14px 25px",
            borderRadius: "30px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            background: "#00d4ff",
            color: "black"
          }}

        >

          All Products

        </button>

      </div>

      {/* ========================= */}
      {/* LOADING */}
      {/* ========================= */}

      {

        loading && (

          <h1
            style={{
              textAlign: "center",
              marginTop: "50px"
            }}
          >
            Loading Products...
          </h1>

        )

      }

      {/* ========================= */}
      {/* PRODUCTS GRID */}
      {/* ========================= */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(320px,1fr))",
          gap: "30px",
          padding: "30px"
        }}
      >

        {

          products.map((product) => (

            <motion.div

              key={product.id}

              whileHover={{
                scale: 1.03
              }}

              style={{
                background: "rgba(255,255,255,0.05)",
                borderRadius: "30px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(20px)"
              }}
            >

              {/* PRODUCT IMAGE */}

              <div
                style={{
                  height: "260px",
                  overflow: "hidden"
                }}
              >

                <img

                  src={
                    product.name.toLowerCase().includes("iphone")
                      ? "https://images.unsplash.com/photo-1592750475338-74b7b21085ab"

                      : product.name.toLowerCase().includes("samsung")
                      ? "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf"

                      : product.name.toLowerCase().includes("nike")
                      ? "https://images.unsplash.com/photo-1542291026-7eec264c27ff"

                      : product.name.toLowerCase().includes("adidas")
                      ? "https://images.unsplash.com/photo-1518002171953-a080ee817e1f"

                      : product.name.toLowerCase().includes("puma")
                      ? "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519"

                      : product.name.toLowerCase().includes("boat")
                      ? "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"

                      : product.name.toLowerCase().includes("sony")
                      ? "https://images.unsplash.com/photo-1589003077984-894e133dabab"

                      : product.name.toLowerCase().includes("watch")
                      ? "https://images.unsplash.com/photo-1523275335684-37898b6baf30"

                      : product.name.toLowerCase().includes("shirt")
                      ? "https://images.unsplash.com/photo-1603252109303-2751441dd157"

                      : product.name.toLowerCase().includes("hoodie")
                      ? "https://images.unsplash.com/photo-1556821840-3a63f95609a7"

                      : product.name.toLowerCase().includes("jeans")
                      ? "https://images.unsplash.com/photo-1541099649105-f69ad21f3246"

                      : "https://images.unsplash.com/photo-1441986300917-64674bd600d8"
                  }

                  alt={product.name}

                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}

                />

              </div>

              {/* PRODUCT DETAILS */}

              <div
                style={{
                  padding: "25px"
                }}
              >

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "15px"
                  }}
                >

                  <span
                    style={{
                      background:
                        "linear-gradient(to right,#ff0080,#7928ca)",
                      padding: "8px 16px",
                      borderRadius: "20px",
                      fontSize: "14px"
                    }}
                  >
                    {product.category}
                  </span>

                  <Heart />

                </div>

                <h2
                  style={{
                    fontSize: "28px",
                    marginBottom: "10px"
                  }}
                >
                  {product.name}
                </h2>

                <p
                  style={{
                    color: "#aaa"
                  }}
                >
                  {product.brand}
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "20px"
                  }}
                >

                  <h1
                    style={{
                      color: "#00d4ff",
                      fontSize: "38px"
                    }}
                  >
                    ₹{product.price}
                  </h1>

                  <div
                    style={{
                      background: "gold",
                      color: "black",
                      padding: "8px 15px",
                      borderRadius: "20px",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      fontWeight: "bold"
                    }}
                  >

                    <Star size={16} />

                    {product.rating}

                  </div>

                </div>

                <button

                  onClick={() => addToCart(product)}

                  style={{
                    width: "100%",
                    marginTop: "20px",
                    padding: "16px",
                    borderRadius: "20px",
                    border: "none",
                    background:
                      "linear-gradient(to right,#ff0080,#ff4d4d)",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "18px",
                    cursor: "pointer"
                  }}

                >

                  Add To Cart

                </button>

              </div>

            </motion.div>

          ))

        }

      </div>

      {/* ========================= */}
      {/* PAGINATION */}
      {/* ========================= */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "50px"
        }}
      >

        <button

          onClick={() => {

            if (page > 1) {

              setPage(page - 1);

            }

          }}

          style={{
            padding: "12px 20px",
            borderRadius: "20px",
            border: "none",
            cursor: "pointer"
          }}

        >

          Previous

        </button>

        <h2>Page {page}</h2>

        <button

          onClick={() => {

            setPage(page + 1);

          }}

          style={{
            padding: "12px 20px",
            borderRadius: "20px",
            border: "none",
            cursor: "pointer"
          }}

        >

          Next

        </button>

      </div>

      {/* ========================= */}
      {/* CART SIDEBAR */}
      {/* ========================= */}

      {

        showCart && (

          <div
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              width: "400px",
              height: "100vh",
              background: "#111827",
              padding: "30px",
              overflowY: "auto",
              zIndex: 200
            }}
          >

            <h1>Shopping Cart</h1>

            {

              cart.length === 0 && (

                <p>Your cart is empty</p>

              )

            }

            {

              cart.map((item, index) => (

                <div
                  key={index}
                  style={{
                    marginTop: "20px",
                    padding: "20px",
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: "20px"
                  }}
                >

                  <h3>{item.name}</h3>

                  <p>₹{item.price}</p>

                  <button

                    onClick={() => removeFromCart(index)}

                    style={{
                      marginTop: "10px",
                      padding: "10px 15px",
                      border: "none",
                      borderRadius: "15px",
                      background: "red",
                      color: "white",
                      cursor: "pointer"
                    }}

                  >

                    Remove

                  </button>

                </div>

              ))

            }

            <h2
              style={{
                marginTop: "30px"
              }}
            >
              Total: ₹{totalPrice}
            </h2>

          </div>

        )

      }

    </div>

  );

}

export default App;
