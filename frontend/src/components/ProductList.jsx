import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductList({ refreshCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    }
    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    await axios.post("http://localhost:5000/api/cart", { productId, qty: 1 });
    refreshCart();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-purple-300">Available Products</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-gray-800 border border-gray-700 rounded-2xl p-4 shadow-lg hover:shadow-purple-500/30 hover:scale-105 transform transition-all duration-200"
          >
            <h3 className="text-lg font-bold text-white">{p.name}</h3>
            <p className="text-gray-400 mb-2">₹{p.price}</p>
            <button
              onClick={() => addToCart(p._id)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
