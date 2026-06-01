import { ShoppingCart, Search } from "lucide-react";

function Navbar() {

  return (

    <div className="navbar">

      <div className="logo">
        CloudCart
      </div>

      <div className="search-box">

        <Search size={18} />

        <input
          type="text"
          placeholder="Search premium products..."
        />

      </div>

      <button className="cart-btn">

        <ShoppingCart size={18} />

        Cart

      </button>

    </div>

  );

}

export default Navbar;

