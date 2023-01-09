import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Cart, Product } from "../../../types";

export interface CartState {
  cartItems: Cart[];
}

const initialState: CartState = {
  cartItems: [],
};

export const cartReducer = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addToCart: (state, actions: PayloadAction<Product>) => {
      let cartIndex = -1;

      state.cartItems.forEach((item, index) => {
        if (item.product.id === actions.payload.id) {
          cartIndex = index;
        }
      });

      // product does not existed in cart
      if (cartIndex === -1) {
        return {
          cartItems: [
            ...state.cartItems,
            {
              product: actions.payload,
              quantity: 1,
              price: actions.payload.price,
            },
          ],
        };
      }

      // quantity of product in cart is greater than it's counted on db
      if (
        state.cartItems[cartIndex].quantity === actions.payload.countInStock
      ) {
        alert("Out of stock");
        return { ...state };
      }

      const newArr = state.cartItems.map((cartItem) => {
        if (cartItem.product.id === actions.payload.id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            price: (cartItem.quantity + 1) * cartItem.price,
          };
        }
        return cartItem;
      });

      return { cartItems: newArr };
    },

    removeFromCart: (state, actions: PayloadAction<Partial<Product["id"]>>) => {
      const newArray = state.cartItems.filter(
        (cartItem) => cartItem.product.id !== actions.payload
      );

      return {
        ...state,
        cartItems: newArray,
      };
    },

    updateCart: (
      state,
      actions: PayloadAction<{ productId: number; quantity: number }>
    ) => {
      const newArr = state.cartItems.map((cartItem) => {
        if (cartItem.product.id === actions.payload.productId) {
          return {
            ...cartItem,
            quantity: actions.payload.quantity,
            price: actions.payload.quantity * cartItem.product.price,
          };
        }
        return cartItem;
      });

      return { cartItems: newArr };
    },
  },
});

const cartActions = cartReducer.actions;

export { cartActions };

export default cartReducer.reducer;
