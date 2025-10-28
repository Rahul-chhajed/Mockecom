import axios from "axios";
import { useState } from "react";

export default function CheckoutModal({ cartItems, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [receipt, setReceipt] = useState(null);

  const checkout = async () => {
    const res = await axios.post("http://localhost:5000/api/checkout", { cartItems });
    setReceipt(res.data);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-20">
      <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-2xl w-80">
        {!receipt ? (
          <>
            <h3 className="text-xl font-bold text-purple-400 mb-4">Checkout</h3>
            <input
              placeholder="Your Name"
              onChange={(e) => setName(e.target.value)}
              className="w-full mb-2 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
            />
            <input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-3 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
            />
            <button
              onClick={checkout}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition"
            >
              Confirm Checkout
            </button>
          </>
        ) : (
          <>
            <h3 className="text-xl font-bold text-green-400 mb-3">✅ Payment Successful</h3>
            <p>Total: ₹{receipt.total}</p>
            <p>Time: {new Date(receipt.timestamp).toLocaleString()}</p>
            <button
              onClick={onClose}
              className="w-full mt-3 bg-gray-700 hover:bg-gray-600 py-2 rounded-lg"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}
