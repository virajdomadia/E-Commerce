import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const totalPrice = cart.reduce(
    (acc, item) =>
      item.product && item.product.price
        ? acc + item.product.price * item.quantity
        : acc,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p>
          Your cart is empty. <Link to="/">Go Shopping</Link>
        </p>
      ) : (
        <>
          {cart
            .filter((item) => item.product) // Skip items with missing products
            .map(({ product, quantity }) => (
              <div
                key={product._id}
                className="flex items-center justify-between mb-4 border-b pb-4"
              >
                <div>
                  <h4 className="text-lg font-semibold">{product.title}</h4>
                  <p>₹{product.price}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(product._id, quantity - 1)}
                    disabled={quantity <= 1}
                    className="px-3 py-1 bg-gray-200"
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() => updateQuantity(product._id, quantity + 1)}
                    className="px-3 py-1 bg-gray-200"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(product._id)}
                  className="text-red-600"
                >
                  Remove
                </button>
              </div>
            ))}

          <div className="mt-6 text-right">
            <h3 className="text-xl font-bold">Total: ₹{totalPrice}</h3>
            <Link
              to="/checkout"
              className="mt-4 inline-block px-6 py-3 bg-green-600 text-white rounded-lg"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
