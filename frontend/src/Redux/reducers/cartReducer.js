import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_CLEAR_ITEMS,
} from "../actions/types";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  shippingAddress: JSON.parse(localStorage.getItem("shippingAddress")) || {},
  paymentMethod: JSON.parse(localStorage.getItem("paymentMethod")) || "",
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      // Check if item already exists in the cart
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        // Update quantity if item already exists in the cart
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        // Add new item to the cart
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case CART_REMOVE_ITEM:
      // Remove item from the cart
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    case CART_SAVE_SHIPPING_ADDRESS:
      // Save shipping address
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case CART_SAVE_PAYMENT_METHOD:
      // Save payment method
      return {
        ...state,
        paymentMethod: action.payload,
      };

    case CART_CLEAR_ITEMS:
      // Clear all items from the cart
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};

export default cartReducer;
