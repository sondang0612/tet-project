import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
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
        if (item.productId === actions.payload.id) {
          cartIndex = index;
        }
      });

      // product does not existed in cart
      if (cartIndex === -1) {
        return {
          cartItems: [
            ...state.cartItems,
            { productId: actions.payload.id, quantity: 1 },
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
        if (cartItem.productId === actions.payload.id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          };
        }
        return cartItem;
      });

      return { cartItems: newArr };
    },
  },
});

const counterActions = cartReducer.actions;

export { counterActions };

export default cartReducer.reducer;
