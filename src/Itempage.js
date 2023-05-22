import { Button } from "antd";

import React, { useEffect } from "react";
import { BsCurrencyRupee } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, addsingleproductData } from "./redexcart/Slice";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
export default function Itempage(props) {
  let pricev = props.price;
  let off = props.offer[0];
  const price1 = off / 100;
  const final1 = price1 * pricev;
  const final = pricev - final1;
  // console.log(pricev, price1, final, off);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddtoCart = (props) => {
    const datas = { ...props, off: final };
    console.log("itemspage", datas);
    dispatch(addToCart(datas)); //addto cart is comming in slice file
    // navigate("/cart");
  };

  const singleProduct = (props, final) => {
    // dispatch(addsingleproductData(props));
    const datas = { ...props, off: final };
    console.log("off", datas);
    try {
        Cookies.set("singleproducts", JSON.stringify(datas));
      navigate("/singleproductdetails");
      toast.success('datas send')
    } catch (error) {
      console.log(error);
      console.log("ed3rdr");
    }
  
  };

  return (
    <div>
      <a className="flex relative h-48 justify-center rounded overflow-hidden">
        <img
          draggable="false"
          className="object-contain w-full h-full block"
          onClick={() => singleProduct(props, final)}
          src={`${props.img[0]}`}
          alt="dc"
        />
      </a>
      <div className="flex">
        <div className="mt-4 pl-2">
          <h3 className="text-gray-500 text-xs tracking-widest mb-1">
            Type:{props.type}
          </h3>
          <h3 className="text-gray-900 tracking-widest mb-1 text-lg font-medium">
            {props.name}
          </h3>

          <div className="flex gap-x-5 ">
            <div className="flex ">
              <BsCurrencyRupee className="mt-1" />
              <p className={`${off > 0 ? "line-through" : ""}`}>
                {props.price}
              </p>
            </div>
            <div className="flex ">
              <BsCurrencyRupee
                className={` ${off > 0 ? "mt-1 text-red-400" : " hidden"}`}
              />
              <p
                className={`${
                  off > 0 ? "text-red-400" : "text-green-500 hidden"
                }`}
              >
                {final}
              </p>
            </div>
          </div>

          {props.stocks > 0 ? (
            <p className="mt-1 text-white bg-green-500 w-fit px-2 pb-[0.5px] rounded-lg">
              In Stock
            </p>
          ) : (
            <p className="mt-1 text-white bg-red-500 w-fit px-2 pb-[0.5px] rounded-lg">
              Out Of Stock
            </p>
          )}
        </div>
        <div>
          <button
            onClick={() => handleAddtoCart(props)}
            className="absolute bottom-2 right-8 bg-[#ee540c] active:bg-[#fc5e15] px-2 pb-[0.5px] rounded-lg text-white"
          >
            Add to Cart
          </button>
        </div>
      </div>
      <a
        className={`${off > 0 ? "block" : "hidden"}
      `}
      >
        <img
          src="./offer.png"
          className="absolute top-0"
          width={70}
          alt="offer"
        />
        <div className="absolute top-3 left-7 leading-[17px]">
          <p className="font-bold text-center text-white">{props.offer}% </p>
          <p className="text-center text-white">OFF </p>
        </div>
      </a>
    </div>
  );
}
