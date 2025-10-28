import { useState } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import CheckoutModal from "./components/CheckoutModal";
import "./App.css";
function App() {
  const [showCheckout, setShowCheckout] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [reload, setReload] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-4 bg-gray-950 shadow-md sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-purple-400 tracking-wide">🛒 Vibe Commerce</h1>
        <button
          onClick={() => setReload(reload + 1)}
          className="bg-purple-500 hover:bg-purple-600 px-4 py-1 rounded-md font-semibold transition"
        >
          Refresh
        </button>
      </header>

      {/* Main Section */}
      <main className="grid md:grid-cols-3 gap-4 p-6">
        <div className="md:col-span-2">
          <ProductList refreshCart={() => setReload(reload + 1)} />
        </div>
        <div>
          <Cart openCheckout={(items) => { setShowCheckout(true); setCartItems(items); }} key={reload} />
        </div>
      </main>

      {/* Checkout Modal */}
      {showCheckout && <CheckoutModal cartItems={cartItems} onClose={() => setShowCheckout(false)} />}
    </div>
  );
}

export default App;
