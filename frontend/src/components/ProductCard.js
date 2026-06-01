import { Heart } from "lucide-react";
import { motion } from "framer-motion";

function ProductCard({ product }) {

  return (

    <motion.div

      className="product-card"

      whileHover={{
        scale: 1.03
      }}

    >

      <div className="product-image">

        <button className="wishlist-btn">
          <Heart size={20} />
        </button>

        <img
          src={`https://picsum.photos/400/400?random=${product.id}`}
          alt={product.name}
        />

      </div>

      <div className="product-info">

        <span className="category">
          {product.category}
        </span>

        <h2>
          {product.name}
        </h2>

        <p className="brand">
          {product.brand}
        </p>

        <div className="price-rating">

          <span className="price">
            ₹{product.price}
          </span>

          <span className="rating">
            ⭐ {product.rating}
          </span>

        </div>

        <button className="add-btn">
          Add To Cart
        </button>

      </div>

    </motion.div>

  );

}

export default ProductCard;

