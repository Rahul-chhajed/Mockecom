import { useEffect, useState } from "react";
import axios from "axios";

export default function Cart({ openCheckout }) {
  const [cart, setCart] = useState({ items: [], total: 0 });

  const loadCart = async () => {
    const res = await axios.get("http://localhost:5000/api/cart");
    setCart(res.data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeItem = async (id) => {
    await axios.delete(`http://localhost:5000/api/cart/${id}`);
    loadCart();
  };

  return (
    <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl shadow-xl">
      <h2 className="text-xl font-semibold text-purple-300 mb-4">Your Cart</h2>
      {cart.items.length === 0 ? (
        <p className="text-gray-400 italic">Your cart is empty.</p>
      ) : (
        <div className="space-y-3">
          {cart.items.map((i) => (
            <div
              key={i._id}
              className="flex justify-between items-center bg-gray-800 px-3 py-2 rounded-lg"
            >
              <span>{i.name} x{i.qty}</span>
              <span className="text-purple-400">₹{i.total}</span>
              <button
                onClick={() => removeItem(i._id)}
                className="text-red-500 hover:text-red-600 transition"
              >
                ❌
              </button>
            </div>
          ))}
          <div className="border-t border-gray-700 pt-3 flex justify-between items-center">
            <span className="font-semibold text-lg">Total</span>
            <span className="text-purple-400 font-bold text-xl">₹{cart.total}</span>
          </div>
          <button
            onClick={() => openCheckout(cart.items)}
            className="w-full mt-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
