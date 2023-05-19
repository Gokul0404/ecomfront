import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsArrowLeftCircle, BsPlusLg } from "react-icons/bs";
import { TiShoppingCart } from "react-icons/ti";
import { BsCurrencyRupee } from "react-icons/bs";
import { AiOutlineMinus } from "react-icons/ai";
import {
  addToCart,
  removeFromCart,
  cleardata,
  getTotals,
} from "../redexcart/Slice";
import { decreaseCart } from "../redexcart/Slice";
import { Divider } from "antd";
export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  console.log(cart);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart]);

  const handleRemoveFormCart = (d) => {
    dispatch(removeFromCart(d));
  };

  const decreaseCount = (d) => {
    dispatch(decreaseCart(d));
  };
  const Incrasevalue = (d) => {
    dispatch(addToCart(d));
  };
  const clearCart = () => {
    dispatch(cleardata());
  };

  return (
    <div>
      <h2 className="font-bold text-[25px] text-center pt-5">Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div className="flex justify-center items-center">
          <div className=" bg-white shadow-2xl h-[50vh]  w-[80vw] my-8 ">
            <p className="text-center font-bold pt-10">
              Your cart is currently empty
            </p>
            <div className="text-center flex items-center justify-center ">
              <TiShoppingCart className="text-[10vw] opacity-20" />
            </div>
            <div className="hover:text-blue-500">
              <Link
                to="/"
                className="flex gap-3 lam text-center items-center justify-center pt-10 "
              >
                <BsArrowLeftCircle className="mt-1 hover:text-red-500" />
                Return To Shop
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex pt-20 ">
          <div className="basis-3/4 mx-2 bg-white ">
            <div>
              <div className="flex gap-[20%] px-20 font-bold pb-2">
                <h3 className="pr-[5.5%]">Product</h3>
                <h3>Price</h3>
                <h3>Quantity</h3>
                <h3>Total</h3>
              </div>
              {cart.cartItems?.map((d) => {
                return (
                  <div
                    className="flex w-[70vw] border border-t-[#c7c7c7]"
                    key={d.id}
                  >
                    <div className="flex">
                      <div className=" flex w-[350px] ">
                        <span className="w-[170px] ml-5">
                          <img src={d.img} className=" " />
                        </span>
                        <div className="pt-5 pl-5">
                          <h2>{d.name}</h2>
                          <p onClick={() => handleRemoveFormCart(d)} className="cursor-pointer px-[10px] pb-[2px] mt-[100px] text-[12px] font-[600] border border-[#e4e4e4] text-[#c9c8c8] hover:text-[#808080]">Remove Product</p>
                        </div>
                      </div>
                    </div>
                    <div className=" w-[5vw] ">
                      <h3 className="pt-5 text-center flex">
                        {" "}
                        <BsCurrencyRupee className="mt-1" />
                        {d.price}
                      </h3>
                    </div>
                    <div className=" flex h-[8%] pt-1 w-[27vw] justify-center items-center ">
                      <div className="flex flex-row  border border-[#cecece] mt-5 px-1 ">
                        <button className=" cursor-pointer">
                          <BsPlusLg
                            className="text-[13px] text-[#818181]"
                            onClick={() => Incrasevalue(d)}
                          />
                        </button>
                        <div className="px-5">{d.cartQuantity}</div>
                        <button className="cursor-pointer ">
                          <AiOutlineMinus
                            className="text-[13px] text-[#818181]"
                            onClick={() => decreaseCount(d)}
                          />
                        </button>
                      </div>
                    </div>
                    <div className=" flex justify-center w-[3.5vw] pt-5 ">
                      <h3 className="flex">
                        <BsCurrencyRupee className="mt-1" />
                        {d.price * d.cartQuantity}
                      </h3>
                    </div>
                  </div>
                );
              })}
              <div className="py-5 pl-[5%]">
                <button
                  className="border border-black px-8 py-2 font-semibold "
                  onClick={() => clearCart()}
                >
                  Clear Cart
                </button>
              </div>
            </div>
            <div className="s"></div>
          </div>
          <div className="pb-5">
            <div className=" bg-white shadow-2xl w-[22vw] h-[50vh] relative ">
              <div className="">
                <p className="text-[14px] text-center pt-10 text-[#b9b9b9]">
                  Taxes and shipping calculated at checkout
                </p>
                <p className="font-bold pl-10 pt-10">Total Quantity: {cart.cartTotalQuantity}</p>
                <p className="font-bold pl-10 pt-10 flex">
                  Total Ammound: <BsCurrencyRupee className="mt-[5.5px] ml-1" />
                  {cart.cartTotalaAmount}
                </p>
                <button className="absolute bottom-5 border border-[#b4b0b0] px-5 left-[28%] py-1 font-bold text-[#707070] active:bg-[#9c9c9c] active:text-[#ffffff]">
                  CheckOut
                </button>
              </div>
            </div>

            <span className="  cursor-pointer hover:text-blue-600">
              <Link to="/" className="flex gap-3 mt-10">
                <BsArrowLeftCircle className="text-[20px] mt-1" />
                <p>Continue to shoping</p>
              </Link>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
