import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Search, Heart } from "lucide-react";

function App() {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5501/products?page=1&limit=12"
      );

      setProducts(response.data.products);

    } catch (err) {

      console.error(err);

    }

  };

  return (

    <div className="min-h-screen bg-[#070B14] text-white overflow-hidden">

      {/* NAVBAR */}

      <div className="
        sticky top-0 z-50
        backdrop-blur-xl
        bg-white/5
        border-b border-white/10
      ">

        <div className="
          max-w-7xl mx-auto
          px-8 py-5
          flex justify-between items-center
        ">

          <h1 className="
            text-4xl font-black
            bg-gradient-to-r
            from-pink-500
            via-purple-500
            to-cyan-400
            bg-clip-text
            text-transparent
          ">
            CloudCart
          </h1>

          <div className="flex items-center gap-5">

            <div className="
              bg-white/10
              border border-white/10
              px-5 py-3
              rounded-full
              flex items-center gap-3
            ">

              <Search size={18} />

              <input
                placeholder="Search products..."
                className="
                  bg-transparent
                  outline-none
                  text-white
                  w-52
                "
              />

            </div>

            <button className="
              bg-gradient-to-r
              from-pink-500
              to-orange-500
              px-5 py-3
              rounded-full
              font-bold
              flex items-center gap-2
              hover:scale-105
              transition
            ">

              <ShoppingCart size={18} />

              Cart

            </button>

          </div>

        </div>

      </div>


      {/* HERO SECTION */}

      <div className="max-w-7xl mx-auto px-8 pt-14">

        <motion.div

          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}

          transition={{ duration: 1 }}

          className="
            relative
            overflow-hidden
            rounded-[40px]
            p-16
            bg-gradient-to-r
            from-purple-700
            via-pink-600
            to-orange-500
            shadow-[0_0_80px_rgba(236,72,153,0.5)]
          "
        >

          {/* GLOW */}

          <div className="
            absolute
            w-[400px]
            h-[400px]
            bg-cyan-400/30
            rounded-full
            blur-[120px]
            top-[-100px]
            right-[-100px]
          "></div>

          <div className="relative z-10">

            <p className="uppercase tracking-[6px] text-white/70">
              Future Shopping Experience
            </p>

            <h1 className="
              text-7xl
              font-black
              leading-tight
              mt-5
            ">

              PREMIUM
              <br />
              ECOMMERCE
              <br />
              PLATFORM

            </h1>

            <p className="
              mt-8
              text-xl
              text-white/80
              max-w-2xl
              leading-relaxed
            ">

              Stunning UI powered by React, Tailwind,
              Framer Motion, Redis Cache and PostgreSQL.

            </p>

            <button className="
              mt-10
              px-8 py-4
              rounded-full
              bg-white
              text-black
              text-lg
              font-black
              hover:scale-105
              transition
            ">

              Explore Collection

            </button>

          </div>

        </motion.div>

      </div>


      {/* PRODUCTS */}

      <div className="max-w-7xl mx-auto px-8 py-20">

        <div className="
          flex justify-between items-center
          mb-12
        ">

          <h2 className="text-5xl font-black">
            Trending Products
          </h2>

          <button className="
            px-6 py-3
            rounded-full
            bg-white/10
            border border-white/10
            hover:bg-white/20
            transition
          ">

            View All

          </button>

        </div>

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-8
        ">

          {products.map((product, index) => (

            <motion.div

              key={product.id}

              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}

              transition={{
                delay: index * 0.05
              }}

              className="
                group
                relative
                overflow-hidden
                rounded-[35px]
                bg-white/5
                border border-white/10
                backdrop-blur-xl
                hover:scale-105
                hover:border-pink-500/40
                transition-all
                duration-500
                shadow-2xl
              "
            >

              {/* PRODUCT IMAGE */}

              <div className="
                h-72
                bg-gradient-to-br
                from-cyan-400
                via-blue-500
                to-purple-600
                flex
                items-center
                justify-center
                text-4xl
                font-black
                relative
                overflow-hidden
              ">

                <div className="
                  absolute
                  w-60
                  h-60
                  bg-white/20
                  blur-[100px]
                  rounded-full
                "></div>

                <span className="relative z-10">
                  {product.brand}
                </span>

              </div>


              {/* WISHLIST */}

              <button className="
                absolute
                top-5
                right-5
                w-12
                h-12
                rounded-full
                bg-black/30
                backdrop-blur-lg
                flex items-center justify-center
                hover:bg-pink-500
                transition
              ">

                <Heart size={20} />

              </button>


              {/* PRODUCT DETAILS */}

              <div className="p-6">

                <div className="
                  inline-block
                  px-4 py-1
                  rounded-full
                  bg-pink-500/20
                  text-pink-300
                  text-sm
                  mb-4
                ">

                  {product.category}

                </div>

                <h3 className="
                  text-2xl
                  font-bold
                  leading-snug
                ">

                  {product.name}

                </h3>

                <div className="
                  mt-5
                  flex justify-between items-center
                ">

                  <span className="
                    text-3xl
                    font-black
                    text-cyan-300
                  ">

                    ₹{product.price}

                  </span>

                  <span className="
                    bg-yellow-400
                    text-black
                    px-4 py-2
                    rounded-full
                    font-bold
                  ">

                    ⭐ {product.rating}

                  </span>

                </div>

                <button className="
                  w-full
                  mt-6
                  py-4
                  rounded-2xl
                  bg-gradient-to-r
                  from-pink-500
                  via-red-500
                  to-orange-500
                  font-black
                  text-lg
                  hover:scale-105
                  transition
                  shadow-lg
                ">

                  Add to Cart

                </button>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default App;
