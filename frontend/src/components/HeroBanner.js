
import { motion } from "framer-motion";

function HeroBanner() {

  return (

    <motion.div

      className="hero"

      initial={{ opacity: 0, y: 50 }}

      animate={{ opacity: 1, y: 0 }}

      transition={{ duration: 1 }}

    >

      <div className="hero-overlay"></div>

      <div className="hero-content">

        <p className="hero-subtitle">
          PREMIUM FUTURE SHOPPING
        </p>

        <h1>
          LUXURY
          <br />
          ECOMMERCE
        </h1>

        <p className="hero-text">

          Futuristic premium shopping experience
          with luxury products, animations,
          colorful gradients and modern UI.

        </p>

        <button>
          Explore Collection
        </button>

      </div>

    </motion.div>

  );

}

export default HeroBanner;

