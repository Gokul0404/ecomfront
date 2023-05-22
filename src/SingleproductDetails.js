import { List } from 'antd';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { AiOutlineHeart } from "react-icons/ai";
import { BsCurrencyRupee, BsStarFill, BsStarHalf } from "react-icons/bs";
import { useDispatch } from 'react-redux';
import { addToCart } from './redexcart/Slice';

export default function SingleproductDetails() {
  const alldatas = JSON.parse(Cookies.get("singleproducts"));
  console.log("data", alldatas);
  const offerprice = alldatas.off
  const of = alldatas.offer

  const dispatch=useDispatch()


  const handleAddtoCart = (alldatas) => {

    dispatch(addToCart(alldatas))
 
  };


  
  const data = alldatas.img[0];
  const alldata =alldatas.img
  const [images, setImages] = useState(data || alldata)

  
  return (
    <div className="flex justify-center items-center">
      <div className="bg-white w-[70vw] h-[80vh] my-5 shadow-xl flex">
        <div className="basis-3/5  relative ">
          <AiOutlineHeart className="absolute right-8 bg-white rounded-full p-1 pt-[6px] cursor-pointer hover:!text-red-600 text-[29px] mt-5" />
          <div className="flex justify-center items-center  ">
            <div className="w-[350px] h-[330px] !scale-[100%] overflow-hidden">
              <img
                src={images}
                className= "h-full w-full" 
              />
            </div>
          </div>
          <div className="flex justify-center items-center gap-x-3 !scale-[80%]">
            <div className="bg-white w-[130px] h-[138px] cursor-pointer  border-[#c5c5c5] border-r-[0.1px]">
              <img
                src={alldatas.img[1]}
                className="w-[350px] mt-2"
                onMouseOver={() => {
                  setImages(alldatas.img[1]);
                }}
              />
            </div>
            <div className="bg-white w-[9vw] h-[22vh] cursor-pointer !scale-[100%]  border-[#c5c5c5] border-r-[0.1px]">
              <img
                src={alldatas.img[2]}
                className="w-[350px] mt-2"
                onMouseOver={() =>setImages(alldatas.img[2])}
              />
            </div>
            <div className="bg-white w-[9vw] h-[22vh] cursor-pointer !scale-[100%]  border-[#c5c5c5] border-r-[0.1px]">
              <img
                src={alldatas.img[3]}
                className="w-[350px] mt-2"
                onMouseOver={() => setImages(alldatas.img[3])}
              />
            </div>
            <div className="bg-white w-[9vw] h-[22vh] cursor-pointer !scale-[100%]  ">
              <img
                src={alldatas.img[0]}
                className="w-[350px] mt-2"
                onMouseOver={() => setImages(alldatas.img[0])}
              />
            </div>
          </div>
        </div>
        <div className="basis-2/5 bg-[#e4e4e4]">
          <div>
            <h6 className="opacity-[25%] text-[12px] font-bold mt-10 pl-5">
              New Collections
            </h6>
          </div>
          <div className="flex">
            <h2 className="text-[30px] font-bold pl-5 mt-2">{alldatas.name}</h2>
            <div className="flex gap-x-1 text-[#ffca39] pl-3 mt-6">
              <BsStarFill className="" />
              <BsStarFill />
              <BsStarFill />
              <BsStarFill />
              <BsStarHalf />
            </div>
          </div>
          <div>
            <p className="opacity-[25%] text-[12px] font-bold  pl-5 mt-2">
              Price
            </p>
            <p
              className={`${
                alldatas.offer > 0
                  ? "pl-5 font-bold line-through "
                  : "pl-5 font-bold "
              }`}
            >
              {alldatas.price}
            </p>
          </div>
          <div className={`${of <= 0 ? "hidden" : " "}`}>
            <p className="opacity-[25%] text-[12px] font-bold  pl-5 mt-2">
              Offer
            </p>
            <p className="pl-5 font-bold">{alldatas.offer}%</p>
          </div>
          <div className={`${of <= 0 ? "hidden" : " "}`}>
            <p className="opacity-[25%] text-[12px] font-bold  pl-5 mt-2">
              Final Price
            </p>
            <p className="pl-4 font-bold flex">
              {" "}
              <BsCurrencyRupee className="mt-1" />
              {offerprice}
            </p>
          </div>
          <div>
            <p className="opacity-[25%] text-[12px] font-bold  pl-5 mt-2">
              Highlights
            </p>
            <div className="ml-8 mt-2 opacity-80">
              <li className="text-[12px] font-bold ">
                6 GB RAM | 128 GB ROM | Expandable Upto 1 TB
              </li>
              <li className="text-[12px] font-bold ">
                16.76 cm (6.6 inch) Full HD+ Display
              </li>
              <li className="text-[12px] font-bold ">
                50MP + 8MP + 2MP | 8MP Front Camera
              </li>
              <li className="text-[12px] font-bold ">
                5000 mAh Lithium Ion Battery
              </li>
              <li className="text-[12px] font-bold ">
                Qualcomm Snapdragon 750G Processor
              </li>
            </div>
            <div>
              <p className="opacity-[25%] text-[12px] font-bold  pl-5 mt-2">
                Description
              </p>
              <p className="opacity-[55%] text-[12px] font-bold  pl-5 mt-2">
                Bring home the efficient Samsung Galaxy F23 5G mobile phone.
              </p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => handleAddtoCart(alldatas)}
                className="bg-[#f56512] text-white text-[15px]  px-2 py-1 font-bold mt-5 rounded-sm active:bg-[#f55516]"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
