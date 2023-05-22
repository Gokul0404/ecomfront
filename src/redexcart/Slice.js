import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { IoTennisballSharp } from "react-icons/io5";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartitem")  //cartItem la the values array va store aguthu
    ? JSON.parse(localStorage.getItem("cartitem"))
    : [],
  cartTotalQuantity: 0,
  cartTotalaAmount: 0,
  sigleproduct:[]
}; 

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //add the product
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.info(
          `Increased ${state.cartItems[itemIndex].name} cart Quantity`
        );
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success(` ${action.payload.name} added to cart`);
        // state.cartItems.push(action.payload)
        console.log("item", itemIndex);
         console.log("state", action.payload);
      }
      localStorage.setItem("cartitem", JSON.stringify(state.cartItems));
     
    },

    //remove the product in cart page   //Increase the product quantity
    removeFromCart(state, action) {
      const nextCartItems = state.cartItems.filter(
        (p) => p.id !== action.payload.id
      );

      state.cartItems = nextCartItems;
      localStorage.setItem("cartitem", JSON.stringify(state.cartItems));
      toast.success(`${action.payload.name} remove from cart`);
    },

    // decreas the product count in cart page

    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (a) => a.id === action.payload.id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        // const nextCartItems = state.cartItems.filter(
        //     (b) => b.id != action.payload.id

        // )
        // state.cartItems = nextCartItems;
        toast.error("minimum 1 quantity should");
      }
      localStorage.setItem("cartitem", JSON.stringify(state.cartItems));
      },
    
    //remove items

      cleardata(state, action) {
          state.cartItems = []
          toast.success('clear the products')
          localStorage.setItem("cartitem", JSON.stringify(state.cartItems))
},

      //get total product value

      getTotals(state, action) {
          
          let { total, quantity } = state.cartItems.reduce(
              (cartTotal, cartItem) => {
                  const { off, price, cartQuantity } = cartItem;
                  const itemTotal =(off ? off: price )* cartQuantity
                  cartTotal.total += itemTotal
                  cartTotal.quantity += cartQuantity
                  return cartTotal;
              },
              {
                  total: 0,
                  quantity:0
              }
          )

          state.cartTotalQuantity = quantity;
          state.cartTotalaAmount=total
    },
      
      
    // addsingleproductData(state, action) {
    //   const siglevalue = action.payload

    //   state.sigleproduct.push(siglevalue);
    //   Cookies.set("singleproduct", JSON.stringify(state.sigleproduct));
    //   console.log(action.payload);

    //   }

      
    },
  
});


export const {
  addToCart,
  removeFromCart,
  decreaseCart,
  cleardata,
  getTotals,
  // addsingleproductData,
} = cartSlice.actions;
export default cartSlice.reducer;
