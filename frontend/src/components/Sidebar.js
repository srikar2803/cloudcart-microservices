function Sidebar() {

  return (

    <div className="sidebar">

      <h2>Filters</h2>

      <div className="filter-group">

        <h3>Categories</h3>

        <label><input type="checkbox" /> Mobiles</label>
        <label><input type="checkbox" /> Fashion</label>
        <label><input type="checkbox" /> Electronics</label>
        <label><input type="checkbox" /> Footwear</label>

      </div>

      <div className="filter-group">

        <h3>Brands</h3>

        <label><input type="checkbox" /> Apple</label>
        <label><input type="checkbox" /> Samsung</label>
        <label><input type="checkbox" /> Nike</label>
        <label><input type="checkbox" /> Adidas</label>

      </div>

      <div className="filter-group">

        <h3>Price</h3>

        <input type="range" />

      </div>

    </div>

  );

}

export default Sidebar;
